using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using socnet.Models;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models.DTO;
using socnet.Infrastructure.Extensions;

namespace socnet.Controllers.api.profile.friends.invites
{
    [Produces("application/json")]
    [Route("api/profile/{profileId:int}/invites")]
    [Authorize(Roles = "Admin,Self")]
    public class InvitesController : Controller
    {
        private readonly IProfileService _profileService;

        public InvitesController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet]
        public IEnumerable<InviteDTO> Get(int profileId)
        {
            var profile = _profileService.GetProfileById(profileId);
            if (profile == null)
            {
                Response.StatusCode = 204;
                return null;
            }
            var dto = profile.ToDto();
            var invites = _profileService.GetInvitesForUser(profileId);
            return invites.Select(x => new InviteDTO
            {
                InviteId = x.InviteId,
                Profile = dto,
                Friend = _profileService.GetProfileById(x.senderId).ToDto()
            });
        }

        
        // POST: api/Invites
        [HttpPost]
        public void Post(int profileId, string inviteId)
        {
            if (!_profileService.InviteExistsForUser(profileId, inviteId)){
                Response.StatusCode = 204;
                return;
            }
            var result = _profileService.AcceptFriendRequest(inviteId);
            if (!result)
            {
                Response.StatusCode = 500;
                return;
            }
            Response.StatusCode = 200;
        }
        
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{inviteId}")]
        public void Delete(int profileId, string inviteId)
        {
            if (!_profileService.InviteExistsForUser(profileId, inviteId)){
                Response.StatusCode = 204;
                return;
            }
            var result = _profileService.DeclineFriendRequest(inviteId);
            if (!result)
            {
                Response.StatusCode = 500;
                return;
            }
            Response.StatusCode = 200;
        }
    }
}
