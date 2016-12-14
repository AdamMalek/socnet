using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/Invite")]
    public class InviteController : Controller
    {
        private readonly IProfileService _profileService;

        public InviteController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Invite> InvitesFor(int id)
        {
            return _profileService.GetInvitesForUser(id);
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Invite> InvitesFrom(int id)
        {
            return _profileService.GetInvitesSentByUser(id);
        }

        [HttpGet("[action]/{senderId}/{receiverId}")]
        public bool Send(int senderId,int receiverId)
        {
            return _profileService.SendFriendRequest(senderId,receiverId);
        }

        [HttpGet("[action]/{inviteId}")]
        public bool Accept(string inviteId)
        {
            return _profileService.AcceptFriendRequest(inviteId);
        }

        [HttpGet("[action]/{inviteId}")]
        public bool Decline(string inviteId)
        {
            return _profileService.DeclineFriendRequest(inviteId);
        }

        [HttpGet("[action]/{profileId}/{friendId}")]
        public bool RemoveFriend(int profileId,int friendId)
        {
            return _profileService.RemoveFriend(profileId,friendId);
        }
    }
}
