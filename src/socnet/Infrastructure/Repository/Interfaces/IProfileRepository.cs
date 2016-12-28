using System;
using System.Linq.Expressions;
using socnet.Models;
using System.Collections.Generic;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IProfileRepository
    {
        Profile GetProfileByPredicate(Expression<Func<Profile, bool>> predicate,params Expression<Func<Profile, object>>[] includes);
        IEnumerable<Profile> GetProfilesByPredicate(Expression<Func<Profile, bool>> predicate,params Expression<Func<Profile, object>>[] includes);
        Profile CreateProfile(Profile data);
        bool UpdateProfile(Profile data);

        bool AddFriend(int senderId, int receiverId);
        bool RemoveFriend(int senderId, int receiverId);
    }
}