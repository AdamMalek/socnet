using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Routing;
using socnet.Models;
using socnet.Models.DTO;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IProfileService
    {
        Profile GetProfileById(int profileId,params Expression<Func<Profile, object>>[] includes);
        Profile GetProfileByEmail(string email,params Expression<Func<Profile, object>>[] includes);
        Profile CreateProfile(ProfileDTO profileData);
        Profile UpdateProfile(int id, ProfileDTO profileData);

        bool ProfileExists(int profileId);
        bool ProfileExists(string profileEmail);

        bool SendFriendRequest(int senderId, int receiverId);
        bool AcceptFriendRequest(string requestId);
        bool RemoveFriend(int profileId, int friendId);
        bool DeclineFriendRequest(string requestId);

        IEnumerable<Profile> GetFriends(int profileId,int count=0,int skip=0);
        bool AreFriends(int profileId, int friendId);

        bool InviteExistsForUser(int profileId, string inviteId);
        IEnumerable<Invite> GetInvitesForUser(int profileId);
        IEnumerable<Invite> GetInvitesSentByUser(int profileId);
    }
}