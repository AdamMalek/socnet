using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;

namespace socnet.Controllers.api.group.request
{
    [Authorize]
    [Route("api/group/{groupId:int}/request")]
    [Route("api/group/{slug}/request")]
    [Produces("application/json")]
    public class RequestMembershipController : Controller
    {
        private readonly IGroupService _groupService;

        private int ProfileId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "profileId").Value);
                }
                catch
                {
                    return -1;
                }
            }
        }

        public RequestMembershipController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("{profileId:int}")]
        public object HasSentRequest(string slug, int? groupId,int profileId)
        {
            SetGroupId(slug, ref groupId);
            if (!IsInRole("GroupAdmin") && !IsInRole("Admin") && (profileId != ProfileId))
            {
                Response.StatusCode = 403;
                return new
                {
                    status = "Forbidden"
                };
            }
            if (!groupId.HasValue)
            {
                Response.StatusCode = 204;
                return new
                {
                    status = "No group with given id"
                };
            }
            var res = _groupService.GetRequests(groupId.Value).Any(x => x.ProfileId == profileId);
            return new
            {
                hasSent = res
            };
        }

        [HttpGet]
        [Authorize(Roles = "GroupAdmin")]
        public IEnumerable<GroupRequest> GetRequests(string slug, int? groupId)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 204;
                Response.WriteAsync("No request with given id");
                return null;
            }
            var req = _groupService.GetRequests(groupId.Value);
            return req;
        }

        [HttpPost]
        public object SendRequest(string slug, int? groupId)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 204;
                return new
                {
                    status= "No request with given id"
                };
            }
            try
            {
                _groupService.SendRequest(groupId.Value, ProfileId);
                Response.StatusCode = 200;
                return new
                {
                    status = "Request sent"
                };
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return new
                {
                    status = e.Message
                };
            }
        }

        [HttpPost("{requestId}/accept")]
        [Authorize(Roles = "GroupAdmin")]
        public object AcceptRequest(string slug, int? groupId, string requestId)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 204;
                return new
                {
                    success = false,
                    status = "No group"
                };
            }
            try
            {
                _groupService.AcceptRequest(requestId);
                Response.StatusCode = 200;
                return new
                {
                    success = true,
                    status = "OK"
                };
            }
            catch (ArgumentException e)
            {
                Response.StatusCode = 400;
                return new
                {
                    success = false,
                    status = e.Message
                };
            }
        }

        [HttpPost("{requestId}/decline")]
        [Authorize(Roles = "GroupAdmin")]
        public object DeclineRequest(string slug, int? groupId, string requestId)
        {
            SetGroupId(slug, ref groupId);
            if (!groupId.HasValue)
            {
                Response.StatusCode = 204;
                Response.WriteAsync("No group");
                return new
                {
                    status = "No group"
                };
            }
            try
            {
                _groupService.DeclineRequest(requestId);
                Response.StatusCode = 200;
                Response.WriteAsync("OK");
                return new
                {
                    status = "OK"
                };
            }
            catch (ArgumentException e)
            {
                Response.StatusCode = 400;
                return new
                {
                    status = e.Message
                };
            }
        }

        private void SetGroupId(string slug, ref int? groupId)
        {
            if (slug != null)
            {
                var res = _groupService.GetIdBySlug(slug);
                if (res.HasValue)
                {
                    groupId = res.Value;
                }
            }
        }

        private bool IsInRole(string roleName)
        {
            return User.HasClaim(x => x.Type == ClaimTypes.Role && x.Value == roleName);
        }
    }
}
