using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Extensions
{
    public static class ConversationExtensions
    {
        public static ConversationDTO ToDto(this Conversation conv, int profileId)
        {
            if (conv == null) return null;
            ConversationDTO dto = new ConversationDTO
            {
                Id = conv.Id,
                Messages = new List<MessageDTO>(),
                FriendId = conv.Member1Id == profileId ? conv.Member2Id : conv.Member1Id
            };

            if (conv.Messages != null)
            {
                foreach (var msg in conv.Messages)
                {
                    dto.Messages.Add(msg.ToDto(profileId));
                }
            }
            return dto;
        }

        public static MessageDTO ToDto(this Message msg, int profileId)
        {
            if (msg == null) return null;
            MessageDTO dto = new MessageDTO
            {
                Date = msg.Date,
                Message = msg.Body,
                ProfileId = msg.ProfileId
            };
            return dto;
        }
    }
}
