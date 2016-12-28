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

        public ConversationService(IConversationRepository convRepository)
        {
            _convRepository = convRepository;
        }
        public bool DeleteConversation(int profileId, int friendId)
        {
            if (GetConversation(profileId,friendId) == null) return false;
            var conv = _convRepository.GetConversationBetween(profileId, friendId);
            return _convRepository.RemoveConversation(conv.Id);
        }

        public ConversationDTO GetConversation(int profileId, int friendId,bool includeMessages=false)
        {
            var conv = _convRepository.GetConversationBetween(profileId, friendId,includeMessages).ToDto(profileId);
            return conv;
        }

        public int GetConversationId(int profileId, int friendId)
        {
            return GetConversation(profileId, friendId).Id;
        }

        public IEnumerable<ConversationDTO> GetInbox(int profileId)
        {
            var convs = _convRepository.GetProfileConversations(profileId);
            return convs.Select(x => x.ToDto(profileId));
        }

        public bool SendMessage(int convId, MessageDTO msg)
        {
            if (msg == null) return false;
            if (string.IsNullOrWhiteSpace(msg.Message)) return false;
            var conv = _convRepository.GetByQuery(x => x.Id == convId,true).FirstOrDefault();
            if (conv == null) return false;
            if (conv.Member1Id != msg.ProfileId && conv.Member2Id != msg.ProfileId) return false;
            Message message = new Message
            {
                ProfileId = msg.ProfileId,
                Body = msg.Message,
                Date = DateTime.UtcNow,
                ConversationId = convId,
            };
            try
            {
                conv.Messages.Add(message);
                _convRepository.UpdateConversation(conv);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
