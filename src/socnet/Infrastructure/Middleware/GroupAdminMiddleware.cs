using Microsoft.AspNetCore.Http;
using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Middleware
{
    public class GroupAdminMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemberService _memberService;
        private readonly IGroupService _groupService;

        public GroupAdminMiddleware(
            RequestDelegate next,
            IMemberService memberService,
            IGroupService groupService)
        {
            _next = next;
            _memberService = memberService;
            _groupService = groupService;
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Value.StartsWith("/api/group/") || !context.User.HasClaim(x => x.Type == ClaimTypes.Role && x.Value == "GroupMember"))
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
                if (!res)
                {
                    var grId = _groupService.GetIdBySlug(idSegment);
                    if (grId != null)
                    {
                        id = grId.Value;
                    }
                }
                if (_memberService.IsInRole(profileId, id, Models.MembershipLevel.Admin))
                {
                    var member = new ClaimsIdentity();
                    member.AddClaim(new Claim(ClaimTypes.Role, "GroupAdmin"));
                    context.User.AddIdentity(member);
                }
            }
            catch { }
            return _next(context);
        }
    }
}
