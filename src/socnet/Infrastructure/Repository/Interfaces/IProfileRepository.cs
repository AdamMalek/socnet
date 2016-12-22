using System;
using System.Linq.Expressions;
using socnet.Models;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IProfileRepository
    {
        Profile GetProfileByPredicate(Expression<Func<Profile, bool>> predicate, Expression<Func<Profile, object>>[] includes = null);
        Profile CreateProfile(Profile data);
        bool UpdateProfile(Profile data);

        bool AddFriend(int senderId, int receiverId);
        bool RemoveFriend(int senderId, int receiverId);
    }
}