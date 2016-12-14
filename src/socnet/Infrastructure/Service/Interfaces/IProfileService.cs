using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Routing;
using socnet.Models;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IProfileService
    {
        Profile GetProfileById(int profileId,params Expression<Func<Profile, object>>[] includes);
        Profile GetProfileByEmail(string email,params Expression<Func<Profile, object>>[] includes);
        Profile CreateProfile(ProfileData profileData);
        Profile UpdateProfile(int id, ProfileData profileData);

        bool SendFriendRequest(int senderId, int receiverId);
        bool AcceptFriendRequest(string requestId);
        bool RemoveFriend(int profileId, int friendId);
        bool DeclineFriendRequest(string requestId);

        IEnumerable<Invite> GetInvitesForUser(int profileId);
        IEnumerable<Invite> GetInvitesSentByUser(int profileId);
    }
}