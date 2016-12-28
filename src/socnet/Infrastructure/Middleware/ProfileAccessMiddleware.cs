using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Middleware
{
    public class ProfileAccessMiddleware
    {
        private readonly RequestDelegate _next;

        public ProfileAccessMiddleware(
            RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Value.StartsWith("/api/profile/"))
            {
                return _next(context);
            }
            try
            {
                var profileId = Convert.ToInt32(context.User.Claims.First(x => x.Type == "userId").Value);
                var path = context.Request.Path.Value;
                var idSegment = path.Split(new char[] { '/' }, StringSplitOptions.RemoveEmptyEntries)[2];
                int id = -1;
                var res = int.TryParse(idSegment, out id);
                if (res && profileId == id)
                {
                    var selfIdentity = new ClaimsIdentity(new List<Claim>
                    {
                        new Claim(ClaimTypes.Role,"Self")
                    });
                    context.User.AddIdentity(selfIdentity);
                }
            }
            catch (Exception)
            {
            }
            return _next(context);
        }
    }
}
