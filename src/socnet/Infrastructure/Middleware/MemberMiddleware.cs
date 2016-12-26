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
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Middleware
{
    public class MemberMiddleware
    {
        private readonly IGroupService _groupService;
        private readonly RequestDelegate _next;
        private readonly IUserService _userService;
        private readonly IMemberService _memberService;
        private readonly ApplicationDbContext _db;

        public MemberMiddleware(
            RequestDelegate next,
            IUserService userService,
            IGroupService groupService,
            IMemberService memberService,
            ApplicationDbContext db)
        {
            _db = db;
            _next = next;
            _userService = userService;
            _groupService = groupService;
            _memberService = memberService;
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Value.StartsWith("/api/group/"))
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
                if (_memberService.IsMember(profileId, id))
                {
                    var member = new ClaimsIdentity();
                    member.AddClaim(new Claim(ClaimTypes.Role, "GroupMember"));
                    var membership = _db.Members.FirstOrDefault(x => x.ProfileId == profileId && x.GroupId == id);
                    if (_memberService.IsInRole(profileId, id, Models.MembershipLevel.Admin))
                    {
                        member.AddClaim(new Claim(ClaimTypes.Role, "GroupAdmin"));
                    }
                    context.User.AddIdentity(member);
                }
            }
            catch{}
            return _next(context);
        }
    }
}
