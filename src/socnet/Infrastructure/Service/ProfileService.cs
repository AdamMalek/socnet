using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using NuGet.Protocol.Core.Types;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;
using socnet.Models.DTO;
using socnet.Infrastructure.Extensions;

namespace socnet.Infrastructure.Service
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IInviteRepository _inviteRepository;

        public ProfileService(IProfileRepository repository, IInviteRepository inviteRepository)
        {
            _profileRepository = repository;
            _inviteRepository = inviteRepository;
        }


        public Profile GetProfileById(int profileId, params Expression<Func<Profile, object>>[] includes)
        {
            return _profileRepository.GetProfileByPredicate(x => x.ProfileId == profileId, includes);
        }

        public Profile GetProfileByEmail(string email, params Expression<Func<Profile, object>>[] includes)
        {
            return _profileRepository.GetProfileByPredicate(x => x.Email == email, includes);
        }

        public Profile CreateProfile(ProfileDTO profileData)
        {
            Profile newProfile = new Profile(profileData);
            _profileRepository.CreateProfile(newProfile);
            return newProfile;
        }

        public Profile UpdateProfile(int id, ProfileDTO profileData)
        {
            var profile = GetProfileById(id);
            profile.AvatarSrc = profileData.AvatarSrc ?? profile.AvatarSrc;
            profile.FirstName = profileData.FirstName ?? profile.FirstName;
            profile.LastName = profileData.LastName ?? profile.LastName;
            profile.University = profileData.University ?? profile.University;
            _profileRepository.UpdateProfile(profile);
            return profile;
        }

        public bool SendFriendRequest(int senderId, int receiverId)
        {
            if (!senderId.Equals(receiverId))
            {
                var sender = GetProfileById(senderId, x => x.Friends);
                var receiver = GetProfileById(receiverId, x => x.Friends);
                if (sender == null || receiver == null) return false;
                if (sender.Friends.Select(x => x.FriendId).Contains(receiverId)) return false;

                var duplicates =
                    _inviteRepository.GetInvites(
                        x =>
                            (x.senderId == senderId && x.receiverId == receiverId) ||
                            (x.senderId == receiverId && x.receiverId == senderId)).Count();
                if (duplicates == 0)
                {
                    return !_inviteRepository.CreateInvite(senderId, receiverId).Equals("");

                }
            }
            return false;
        }

        public bool AcceptFriendRequest(string requestId)
        {
            var invite = _inviteRepository.GetInviteById(requestId);
            if (invite == null) return false;
            var sender = GetProfileById(invite.senderId);
            var receiver = GetProfileById(invite.receiverId);
            if (sender != null && receiver != null)
            {
                var ret = _profileRepository.AddFriend(sender.ProfileId, receiver.ProfileId);
                if (ret)
                {
                    _inviteRepository.RemoveInvite(requestId);
                }
                return ret;
            };
            return false;
        }

        public bool RemoveFriend(int profileId, int friendId)
        {
            return _profileRepository.RemoveFriend(profileId, friendId);
        }

        public bool DeclineFriendRequest(string requestId)
        {
            return _inviteRepository.RemoveInvite(requestId);
        }

        public IEnumerable<Invite> GetInvitesForUser(int profileId)
        {
            return _inviteRepository.GetInvites(x => x.receiverId == profileId).AsEnumerable();
        }

        public IEnumerable<Invite> GetInvitesSentByUser(int profileId)
        {
            return _inviteRepository.GetInvites(x => x.senderId == profileId).AsEnumerable();
        }

        public bool ProfileExists(int profileId)
        {
            return _profileRepository.GetProfileByPredicate(x => x.ProfileId == profileId) != null;
        }

        public bool ProfileExists(string profileEmail)
        {
            return _profileRepository.GetProfileByPredicate(x => x.Email == profileEmail) != null;
        }

        public IEnumerable<Profile> GetFriends(int profileId, int count = 0, int skip = 0)
        {
            var ids = GetProfileById(profileId, x => x.Friends, x => x.Friends).Friends.Select(x=> x.FriendId);
            return _profileRepository.GetProfilesByPredicate(x => ids.Contains(x.ProfileId)).AsEnumerable();
        }

        public bool AreFriends(int profileId, int friendId)
        {
            var friendIds = _profileRepository.GetProfileByPredicate(x => x.ProfileId == profileId,x=> x.Friends)
                .Friends.Select(x=> x.FriendId);
            return friendIds.Contains(friendId);
        }

        public bool InviteExistsForUser(int profileId, string inviteId)
        {
            return _inviteRepository.GetInvites(x => x.receiverId == profileId && x.InviteId == inviteId).FirstOrDefault() != null;
        }
    }
}
