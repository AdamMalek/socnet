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

        public void CreateMember(int groupId, int profileId, MembershipLevel role)
        {
            var group = _groupRepository.GetById(groupId);
            if (group == null) throw new ArgumentException("Group doesn't exist!");
            var user = _profileRepository.GetProfileByPredicate(x => x.ProfileId == profileId);
            if (user == null) throw new ArgumentException("Profile doesn't exist!");
            if (IsMember(profileId, group.GroupId))
                throw new ArgumentException("Profile already a member of this group!");
            Member newMember = new Member
            {
                GroupId = groupId,
                ProfileId = profileId,
                Role = role
            };
            try
            {
                _memberRepository.CreateMember(newMember);
            }
            catch (Exception e)
            {
                throw new ArgumentException(e.Message);
            }
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

        public void RemoveMember(int membershipId)
        {
            var membership = GetMembership(membershipId);
            if (membership == null) throw new ArgumentException("Invalid membership id");
            try
            {
                _memberRepository.DeleteMember(membership);
            }
            catch
            {
                throw new ArgumentException("Database error");
            }
        }

        public void RemoveMember(int groupId, int profileId)
        {
            var membership = GetMembership(groupId, profileId);
            if (membership == null) throw new ArgumentException("Invalid membership id");

            if (membership.Role == MembershipLevel.Admin
                && _memberRepository.GetMembersWhere(x => x.GroupId == groupId && x.Role == MembershipLevel.Admin).Count() == 1) throw new ArgumentException("Cannot remove last administrator from group.");
            try
            {
                _memberRepository.DeleteMember(membership);
            }
            catch
            {
                throw new ArgumentException("Database error.");
            }
        }


        public IEnumerable<Member> GetGroupMembers(int groupId, params Expression<Func<Member, object>>[] includes)
        {
            return _memberRepository.GetMembersWhere(x => x.GroupId == groupId, includes);
        }
        public void SetRole(int membershipId, MembershipLevel newRole)
        {
            var membership = GetMembership(membershipId);
            SetRole(membership, newRole);
        }

        public void SetRole(int profileId, int groupId, MembershipLevel newRole)
        {
            var membership = GetMembership(groupId, profileId);
            SetRole(membership, newRole);
        }

        private void SetRole(Member member, MembershipLevel newRole)
        {
            if (member == null) throw new ArgumentException("Invalid member");
            if (newRole == MembershipLevel.User)
            {
                var admins = _memberRepository.GetMembersWhere(x => x.Role == MembershipLevel.Admin && x.GroupId == member.GroupId);
                if (admins.Count() == 1 && admins.First().ProfileId == member.ProfileId) throw new ArgumentException("Cannot remove admin rights from only admin in group.");
            }
            member.Role = newRole;
            try
            {
                _memberRepository.UpdateMember(member);
            }
            catch
            {
                throw new ArgumentException("Database error");
            }
        }

        public IEnumerable<Profile> GetMembers(string slug)
        {
            return GetMembers(x => x.Group.GroupSlug == slug, x => x.Group).Select(x => x.Profile);
        }

        public IEnumerable<Profile> GetMembers(int id)
        {
            return GetGroupMembers(id).Select(x => x.Profile);
        }

        public IEnumerable<Profile> GetMembersWithRole(string slug, MembershipLevel role)
        {
            var group = _groupRepository.GetBySlug(slug, x => x.Members);
            return GetMembersWithRole(group, role);
        }

        public IEnumerable<Profile> GetMembersWithRole(int id, MembershipLevel role)
        {
            var group = _groupRepository.GetById(id,x=> x.Members);
            return GetMembersWithRole(group, role);
        }

        IEnumerable<Profile> GetMembersWithRole(Group group, MembershipLevel role)
        {
            if (group == null) return null;

            return GetMembers(x => x.GroupId == group.GroupId && x.Role == role).Select(x => x.Profile);
        }
    }
}
