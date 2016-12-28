using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using socnet.Models.DTO;
using socnet.Infrastructure.Service.Interfaces;

namespace socnet.Controllers.api.profile.conversations
{
    [Produces("application/json")]
    [Route("api/profile/{profileId:int}/conversations")]
    [Authorize]
    public class ConversationController : Controller
    {
        private readonly IConversationService _conversationService;
        public ConversationController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpGet]
        [Authorize(Roles = "Self,Admin")]
        public IEnumerable<ConversationDTO> Get(int profileId, bool messages = false)
        {
            return _conversationService.GetInbox(profileId, messages);
        }

        [HttpGet("{friendId:int}")]
        [Authorize(Roles = "Self,Admin")]
        public ConversationDTO Get(int profileId, int friendId, bool messages = false)
        {
            return _conversationService.GetConversation(profileId, friendId, messages);
        }

        [HttpPost("{friendId:int}")]
        [Authorize(Roles = "Self")]
        public void Post(int profileId, int friendId, MessageDTO msg)
        {
            if (msg == null)
            {
                Response.StatusCode = 204;
                return;
            }
            msg.Date = DateTime.UtcNow;
            msg.ProfileId = profileId;
            var res = _conversationService.SendMessage(friendId, msg);
            if (!res)
            {
                Response.StatusCode = 500;
                return;
            }
        }
    }
}
