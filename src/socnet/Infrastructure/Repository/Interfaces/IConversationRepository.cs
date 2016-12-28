using socnet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IConversationRepository
    {
        Conversation GetConversationBetween(int profile1Id, int profile2Id,bool includeMessages=false);

        IEnumerable<Conversation> GetProfileConversations(int profileId);

        IEnumerable<Conversation> GetByQuery(Expression<Func<Conversation, bool>> predicate, bool includeMsg=false);

        Conversation AddConversaion(Conversation conv);

        bool RemoveConversation(int id);

        bool UpdateConversation(Conversation conv);
    }
}
