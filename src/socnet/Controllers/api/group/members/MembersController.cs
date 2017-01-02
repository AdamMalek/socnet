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

        public MembersController(IMemberService memberService, IGroupService groupService, IProfileService profileService) : base(groupService)
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
        public object Post(string slug, int? groupId, AddMemberDTO member)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 404;
                return new
                {
                    success = false,
                    message = "No group"
                };
            }
            member.GroupId = groupId.Value;
            if (_profileService.ProfileExists(member.ProfileId) && !_memberService.IsMember(member.ProfileId, member.GroupId))
            {
                try
                {
                    _memberService.CreateMember(member.GroupId, member.ProfileId, member.Role);
                    Response.StatusCode = 200;
                    return new
                    {
                        success = true,
                        message = "OK"
                    };
                }
                catch (Exception e)
                {
                    Response.StatusCode = 500;
                    return new
                    {
                        success = false,
                        message = e.Message
                    };
                }
            }
            else
            {
                Response.StatusCode = 400;
                return new
                {
                    success = false,
                    message = "Profile doesn't exist or is already a member"
                };
            }
        }

        // PUT: api/Members/5
        [HttpPut("{profileId:int}")]
        [Authorize(Roles = "GroupAdmin")]
        public object Put(string slug, int? groupId, int profileId, string newRole)
        {
            SetGroupId(slug, ref groupId);

            if (!_memberService.IsMember(profileId, groupId.Value))
            {
                Response.StatusCode = 400;
                return new
                {
                    success = false,
                    message = "Given user is not a member"
                };
            }

            var role = newRole.ToLower() == "admin" ? MembershipLevel.Admin : MembershipLevel.User;
            try
            {
                _memberService.SetRole(profileId, groupId.Value, role);
                Response.StatusCode = 200;
                return new
                {
                    success = true,
                    message = "OK"
                };
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                return new
                {
                    success = false,
                    message = e.Message
                };
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{profileId:int}")]
        [Authorize(Roles ="GroupMember")]
        public object Delete(string slug, int? groupId, int profileId)
        {
            SetGroupId(slug, ref groupId);
            //if (!groupId.HasValue ||
            //    !_memberService.IsMember(profileId, groupId.Value))
            //{
            //    Response.StatusCode = 404;
            //    return new
            //    {
            //        message = "No group or member",
            //        success = false
            //    };
            //}
            if (profileId != ProfileId && !IsInRole("GroupAdmin"))
            {
                Response.StatusCode = 403;
                return new
                {
                    message = "Forbidden",
                    success = false
                };
            }
            try
            {
                _memberService.RemoveMember(groupId.Value, profileId);
                Response.StatusCode = 200;
                return new
                {
                    message = "OK",
                    success = true
                };
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return new
                {
                    message = e.Message,
                    success = false
                };
            }
        }


    }
}
