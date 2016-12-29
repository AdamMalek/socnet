using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using socnet.Infrastructure.Service.Interfaces;
using Microsoft.IdentityModel.Tokens;
using socnet.Data;
using socnet.Models;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Middleware
{
    public class RefreshTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenProviderOptions _options;
        private readonly ILogger _logger;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly IUserService _userService;
        private readonly IMemberService _memberService;
        private readonly TokenValidationParameters _param;
        private readonly ApplicationDbContext _db;

        public RefreshTokenMiddleware(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options,
            TokenValidationParameters param,
            ILoggerFactory loggerFactory,
            IUserService userService,
            IMemberService memberService,
            ApplicationDbContext db)
        {
            _param = param;
            _next = next;
            _logger = loggerFactory.CreateLogger<TokenProviderMiddleware>();
            _userService = userService;
            _memberService = memberService;
            _options = options.Value;
            _db = db;
            ThrowIfInvalidOptions(_options);

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.RefreshTokenPath, StringComparison.Ordinal))
            {
                return _next(context);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!context.Request.Method.Equals("POST")
               || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }
            if (!context.Request.Headers.Any(x => x.Key == "Authorization"))
            {
                context.Response.StatusCode = 401;
                return context.Response.WriteAsync("No refresh token given.");
            }
            string token = context.Request.Headers["Authorization"];
            var split = token.Split(' ');
            if (!split[0].Equals("Bearer") || split.Length != 2)
            {
                context.Response.StatusCode = 401;
                return context.Response.WriteAsync("No refresh token given.");
            }
            token = split[1];
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            SecurityToken tok;
            try
            {
                ClaimsPrincipal claimsprincipal = handler.ValidateToken(token, _param, out tok);
                var userIdstr = claimsprincipal.Claims.FirstOrDefault(x => x.Type == "userId").Value;
                var token_type = claimsprincipal.Claims.FirstOrDefault(x => x.Type == "token_type")?.Value;
                if (token_type == null || !token_type.Equals("refresh_token"))
                {
                    context.Response.StatusCode = 401;
                    return context.Response.WriteAsync("Invalid refresh token.");
                }
                var userId = Convert.ToInt32(userIdstr);
                var ret = GenerateToken(context, userId);
                return ret;
            }
            catch
            {
                context.Response.StatusCode = 401;
                return context.Response.WriteAsync("Invalid refresh token.");
            }
        }

        private async Task GenerateToken(HttpContext context, int userId)
        {
            var identity = await GetIdentity(userId);
            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;

            // Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, await _options.NonceGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(now).ToString(), ClaimValueTypes.Integer64),
            };

            claims.AddRange(identity.Claims);

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(_options.AccessTokenExpiration),
                signingCredentials: _options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)_options.AccessTokenExpiration.TotalSeconds
            };

            // Serialize and return the response
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, _serializerSettings));
        }

        private static void ThrowIfInvalidOptions(TokenProviderOptions options)
        {
            if (string.IsNullOrEmpty(options.RefreshTokenPath))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.RefreshTokenPath));
            }

            if (string.IsNullOrEmpty(options.Issuer))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.Issuer));
            }

            if (string.IsNullOrEmpty(options.Audience))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.Audience));
            }

            if (options.AccessTokenExpiration == TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(TokenProviderOptions.AccessTokenExpiration));
            }

            //if (options.IdentityResolver == null)
            //{
            //    throw new ArgumentNullException(nameof(TokenProviderOptions.IdentityResolver));
            //}

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.SigningCredentials));
            }

            if (options.NonceGenerator == null)
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.NonceGenerator));
            }
        }

        /// <summary>
        /// Get this datetime as a Unix epoch timestamp (seconds since Jan 1, 1970, midnight UTC).
        /// </summary>
        /// <param name="date">The date to convert.</param>
        /// <returns>Seconds since Unix epoch.</returns>
        public static long ToUnixEpochDate(DateTime date) => new DateTimeOffset(date).ToUniversalTime().ToUnixTimeSeconds();

        private Task<ClaimsIdentity> GetIdentity(int userId)
        {
            var user = _userService.GetUserById(userId);
            if (user == null) return null;

            user = _userService.GetUserById(user.UserId, x => x.Profile);
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim("userId", user.UserId.ToString(), ClaimValueTypes.Integer32),
                new Claim("profileId", user.Profile.ProfileId.ToString(), ClaimValueTypes.Integer32),
            };
            var groups = _db.Set<Member>().AsNoTracking().Where(x=> x.ProfileId == user.UserId);
            foreach (var group in groups)
            {
                claims.Add(new Claim("member", group.GroupId.ToString(), ClaimValueTypes.Integer));
                if (group.Role == Models.MembershipLevel.Admin)
                {
                    claims.Add(new Claim("admin", group.GroupId.ToString(), ClaimValueTypes.Integer));
                }
            }
            claims.AddRange(_userService.GetRoles(user.UserId).Select(role => new Claim(ClaimTypes.Role, role)));

            var ret = new ClaimsIdentity(claims);
            return Task.FromResult(ret);
        }

    }
}
