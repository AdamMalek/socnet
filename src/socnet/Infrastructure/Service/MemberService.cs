using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using socnet.Models.DTO;
using System.Linq.Expressions;
using socnet.Infrastructure.Repository.Interfaces;

namespace socnet.Infrastructure.Service
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IProfileRepository _profileRepository;

        public MemberService(IMemberRepository repo, IGroupRepository groupRepo, IProfileRepository profileRepository)
        {
            _memberRepository = repo;
            _groupRepository = groupRepo;
            _profileRepository = profileRepository;
        }
        public bool CreateMember(int groupId, int profileId, MembershipLevel role)
        {
            var group = _groupRepository.GetById(groupId);
            if (group == null) return false;
            var user = _profileRepository.GetProfileByPredicate(x => x.ProfileId == profileId);
            if (user == null) return false;
            if (IsMember(profileId, group.GroupId)) return false;
            Member newMember = new Member
            {
                GroupId = groupId,
                ProfileId = profileId,
                Role = role
            };
            _memberRepository.CreateMember(newMember);
            return true;
        }

        public IEnumerable<Member> GetMembers(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes)
        {
            return _memberRepository.GetMembersWhere(predicate, includes);
        }

        public Member GetMembership(int membershipId)
        {
            return _memberRepository.GetMembersWhere(x => x.MemberId == membershipId).FirstOrDefault();
        }

        public Member GetMembership(int groupId, int profileId)
        {
            return _memberRepository.GetMembersWhere(x => x.ProfileId == profileId && x.GroupId == groupId).FirstOrDefault();
        }

        public bool IsInRole(int membershipId, MembershipLevel role)
        {
            return GetMembership(membershipId).Role == role;
        }

        public bool IsInRole(int profileId, int groupId, MembershipLevel role)
        {
            return GetMembership(groupId, profileId).Role == role;
        }

        public bool IsMember(int profileId, int groupId)
        {
            return GetMembership(groupId, profileId) != null;
        }

        public bool RemoveMember(int membershipId)
        {
            var membership = GetMembership(membershipId);
            if (membership == null) return false;
            _memberRepository.DeleteMember(membership);
            return true;
        }

        public bool RemoveMember(int groupId, int profileId)
        {
            var membership = GetMembership(groupId,profileId);
            if (membership == null) return false;

            if (membership.Role == MembershipLevel.Admin
                && _memberRepository.GetMembersWhere(x=> x.GroupId == groupId && x.Role ==  MembershipLevel.Admin).Count() == 1) return false;

            return _memberRepository.DeleteMember(membership);
        }

        public bool SetRole(int membershipId, MembershipLevel newRole)
        {
            var membership = GetMembership(membershipId);
            membership.Role = newRole;
            return _memberRepository.UpdateMember(membership);
        }

        public IEnumerable<Member> GetGroupMembers(int groupId, params Expression<Func<Member, object>>[] includes)
        {
            return _memberRepository.GetMembersWhere(x => x.GroupId == groupId, includes);
        }
    }
}
