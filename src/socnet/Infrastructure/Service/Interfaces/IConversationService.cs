using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IConversationService
    {
        ConversationDTO GetConversation(int profileId, int friendId,bool includeMessages = false);
        int GetConversationId(int profileId, int friendId);

        IEnumerable<ConversationDTO> GetInbox(int profileId);

        bool SendMessage(int convId, MessageDTO msg);

        bool DeleteConversation(int profileId, int friendId);
    }
}
