using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using socnet.Models;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IInviteRepository
    {
        string CreateInvite(int senderId, int receiverId);
        bool RemoveInvite(string inviteId);
        Invite GetInviteById(string id);
        IEnumerable<Invite> GetInvites(Expression<Func<Invite,bool>> predicate);
    }
}