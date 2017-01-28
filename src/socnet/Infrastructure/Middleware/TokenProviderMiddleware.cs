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
using socnet.Data;
using socnet.Models;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Middleware
{
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenProviderOptions _options;
        private readonly ILogger _logger;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly IUserService _userService;
        private readonly IMemberService _memberService;
        private readonly ApplicationDbContext _db;

        public TokenProviderMiddleware(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options,
            ILoggerFactory loggerFactory,
            IUserService userService,
            IMemberService memberService,
            ApplicationDbContext db)
        {
            _db = db;
            _next = next;
            _logger = loggerFactory.CreateLogger<TokenProviderMiddleware>();
            _userService = userService;
            _memberService = memberService;
            _options = options.Value;
            ThrowIfInvalidOptions(_options);

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.AccessTokenPath, StringComparison.Ordinal))
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

            _logger.LogInformation("Handling request: " + context.Request.Path);
            var ret = GenerateToken(context);
            return ret;
        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var identity = await GetIdentity(username, password);
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
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, await _options.NonceGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(now).ToString(), ClaimValueTypes.Integer64),
            };


            claims.AddRange(identity.Claims);

            var refreshClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, await _options.NonceGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(now).ToString(), ClaimValueTypes.Integer64),
                claims.First(x=> x.Type == "userId"),
                new Claim("token_type","refresh_token")
            };

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(_options.AccessTokenExpiration),
                signingCredentials: _options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var refreshJwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: refreshClaims,
                notBefore: now,
                expires: now.Add(_options.RefreshTokenExpiration),
                signingCredentials: _options.SigningCredentials);
            var encodedRefreshJwt = new JwtSecurityTokenHandler().WriteToken(refreshJwt);

            var response = new
            {
                access_token = encodedJwt,
                refresh_token = encodedRefreshJwt,
                expires_in = (int)_options.AccessTokenExpiration.TotalSeconds
            };

            // Serialize and return the response
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, _serializerSettings));
        }

        private static void ThrowIfInvalidOptions(TokenProviderOptions options)
        {
            if (string.IsNullOrEmpty(options.AccessTokenPath))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.AccessTokenPath));
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

        private Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var user = _userService.LoginUser(username, password);
            if (user == null) return null;

            user = _userService.GetUserById(user.UserId, x => x.Profile);
            List<Claim> claims = new List<Claim>
            {
                new Claim("userId", user.UserId.ToString(), ClaimValueTypes.Integer32),
                new Claim("profileId", user.Profile.ProfileId.ToString(), ClaimValueTypes.Integer32),
            };
            var groups = _db.Set<Member>().AsNoTracking().Where(x => x.ProfileId == user.UserId);
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
