using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;
using socnet.Models.DTO;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/group/{groupId:int}/members", Name = "MembersId")]
    [Route("api/group/{slug}/members", Name = "MembersSlug")]
    [Authorize]
    public class MembersController : GroupBaseController
    {
        private readonly IMemberService _memberService;
        private readonly IProfileService _profileService;

        public MembersController(IMemberService memberService, IGroupService groupService, IProfileService profileService):base(groupService)
        {
            _memberService = memberService;
            _profileService = profileService;
        }
        // GET: api/Members
        [HttpGet]
        public IEnumerable<MemberDTO> Get(string slug, int? groupId)
        {
            if (slug != null)
            {
                groupId = _groupService.GetIdBySlug(slug);
            }
            if (groupId.HasValue)
            {
                if (_groupService.GetGroupById(groupId.Value) == null)
                {
                    return null;
                }
                return _memberService.GetGroupMembers(groupId.Value, x => x.Profile).Select(x => new MemberDTO
                {
                    GroupId = x.GroupId,
                    MemberId = x.MemberId,
                    Admin = x.Role == MembershipLevel.Admin,
                    Profile = new Profile
                    {
                        AvatarSrc = x.Profile.AvatarSrc,
                        Email = x.Profile.Email,
                        FirstName = x.Profile.FirstName,
                        LastName = x.Profile.LastName,
                        University = x.Profile.University,
                        ProfileId = x.Profile.ProfileId,
                        Friends = x.Profile.Friends?.Select(f => new Relation
                        {
                            FriendId = f.FriendId,
                            ProfileId = f.ProfileId,
                            RelationId = f.RelationId
                        }).ToList()
                    }
                });
            }
            else
            {
                Response.StatusCode = 404;
                Response.WriteAsync("No group");
                return null;
            }
        }

        // POST: api/Members
        [HttpPost]
        [Authorize(Roles = "GroupAdmin")]
        public void Post(string slug, int? groupId, AddMemberDTO member)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("No group");
                return;
            }
            member.GroupId = groupId.Value;
            if (_profileService.ProfileExists(member.ProfileId) && !_memberService.IsMember(member.ProfileId, member.GroupId))
            {
                var result = _memberService.CreateMember(member.GroupId, member.ProfileId, member.Role);
                if (result)
                {
                    Response.StatusCode = 200;
                    Response.WriteAsync("OK");
                }
                else
                {
                    Response.StatusCode = 500;
                    Response.WriteAsync("Internal error");
                }
            }
            else
            {
                Response.StatusCode = 500;
                Response.WriteAsync("Data incorrect");
            }
        }

        // PUT: api/Members/5
        [HttpPut("{profileId:int}")]
        [Authorize(Roles = "GroupAdmin")]
        public void Put(string slug, int? groupId, int profileId, string newRole)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue ||
                !_memberService.IsMember(profileId, groupId.Value) ||
                !_profileService.ProfileExists(profileId))
            {
                Response.StatusCode = 404;
                Response.WriteAsync("No group");
            }
            var role = newRole.ToLower() == "admin" ? MembershipLevel.Admin : MembershipLevel.User;
            var result = _memberService.SetRole(profileId, groupId.Value, role);
            if (result)
            {
                Response.StatusCode = 200;
                Response.WriteAsync("Ok");
            }
            else
            {
                Response.StatusCode = 500;
                Response.WriteAsync("Internal error");
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{profileId:int}")]
        [Authorize]
        public object Delete(string slug, int? groupId, int profileId)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue ||
                !_memberService.IsMember(profileId, groupId.Value))
            {
                Response.StatusCode = 404;
                return new
                {
                    status = "No group or member",
                    deleted = false
                };
            }
            if (profileId != ProfileId && !IsInRole("GroupAdmin"))
            {
                Response.StatusCode = 403;
                return new
                {
                    status = "Forbidden",
                    deleted = false
                };
            }
            var result = _memberService.RemoveMember(groupId.Value, profileId);
            if (!result)
            {
                Response.StatusCode = 400;
                return new
                {
                    status = "Error",
                    deleted = false
                };
            }
            Response.StatusCode = 200;
            return new
            {
                status = "OK",
                deleted = true
            };
        }

        
    }
}
