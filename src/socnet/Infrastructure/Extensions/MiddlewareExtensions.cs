using Microsoft.AspNetCore.Builder;
using socnet.Infrastructure.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Extensions
{
    public static class MiddlewareExtensions
    {
        public static void UseGroupMemberMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<MemberMiddleware>();
        }

        public static void UseGroupAdminMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<GroupAdminMiddleware>();
        }

        public static void UseCheckProfileOwnerMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ProfileAccessMiddleware>();
        }
    }
}
