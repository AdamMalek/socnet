using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;
using socnet.Infrastructure.Extensions;
using socnet.Models.DTO;

namespace socnet.Controllers.api.profile.friends
{
    [Produces("application/json")]
    [Route("api/profile/{profileId:int}/friends")]
    [Authorize]
    public class FriendsController : Controller
    {
        private readonly IProfileService _profileService;

        public FriendsController(IProfileService profileService)
        {
            _profileService = profileService;
        }
        // GET: api/Friends
        [HttpGet]
        [Authorize(Roles = "Self,Admin,Friend")]
        public IEnumerable<ProfileDTO> Get(int profileId)
        {
            if (!_profileService.ProfileExists(profileId))
            {
                Response.StatusCode = 204;
                return null;
            }
            var friends = _profileService.GetFriends(profileId).Select(x=> x.ToDto());
            return friends;
        }
        
        // POST: api/Friends
        [HttpPost]
        [Authorize(Roles ="Self")]
        public void Post(int profileId, int friendId)
        {
            if (!_profileService.ProfileExists(friendId))
            {
                Response.StatusCode = 204;
                return;
            }
            var result = _profileService.SendFriendRequest(profileId, friendId);
            if (!result)
            {
                Response.StatusCode = 500;
                return;
            }
        }
        
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{friendId:int}")]
        [Authorize(Roles ="Self")]
        public void Delete(int profileId, int friendId)
        {
            if (_profileService.AreFriends(profileId, friendId))
            {
                var result = _profileService.RemoveFriend(profileId, friendId);
                if (result)
                {
                    Response.StatusCode = 500;
                    return;
                }
                Response.StatusCode = 200;
                return;
            }
            Response.StatusCode = 204;
        }
    }
}
