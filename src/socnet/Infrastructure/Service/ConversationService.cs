using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models.DTO;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Infrastructure.Extensions;
using socnet.Models;

namespace socnet.Infrastructure.Service
{
    public class ConversationService : IConversationService
    {
        private IConversationRepository _convRepository;
        private readonly IProfileService _profileService;

        public ConversationService(IConversationRepository convRepository, IProfileService profileService)
        {
            _convRepository = convRepository;
            _profileService = profileService;
        }
        public bool DeleteConversation(int profileId, int friendId)
        {
            if (GetConversation(profileId, friendId) == null) return false;
            var conv = _convRepository.GetConversationBetween(profileId, friendId);
            return _convRepository.RemoveConversation(conv.Id);
        }

        public ConversationDTO GetConversation(int profileId, int friendId, bool includeMessages = false)
        {
            var conv = _convRepository.GetConversationBetween(profileId, friendId, includeMessages).ToDto(profileId);
            return conv;
        }

        public int GetConversationId(int profileId, int friendId)
        {

            var conv = GetConversation(profileId, friendId);
            return conv == null ? -1 : conv.Id;
        }

        public IEnumerable<ConversationDTO> GetInbox(int profileId, bool includeMsgs)
        {
            var convs = _convRepository.GetProfileConversations(profileId, includeMsgs);
            return convs.Select(x => x.ToDto(profileId));
        }

        public bool SendMessage(int friendId, MessageDTO msg)
        {
            if (msg == null) return false;
            if (string.IsNullOrWhiteSpace(msg.Message)) return false;
            var conv = _convRepository.GetConversationBetween(msg.ProfileId,friendId);
            if (conv == null)
            {
                if (!_profileService.ProfileExists(friendId) || !_profileService.AreFriends(msg.ProfileId, friendId)) return false;
                conv = new Conversation
                {
                    Member1Id = msg.ProfileId,
                    Member2Id = friendId,
                    Messages = new List<Message>()
                };
                conv = _convRepository.AddConversaion(conv);
                if (conv == null) return false;
            }
            Message message = new Message
            {
                ProfileId = msg.ProfileId,
                Body = msg.Message,
                Date = DateTime.UtcNow,
                ConversationId = conv.Id,
            };
            try
            {
                _convRepository.AddMessage(message);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
