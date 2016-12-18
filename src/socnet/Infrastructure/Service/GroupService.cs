using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using socnet.Models.DTO;
using System.Linq.Expressions;
using socnet.Infrastructure.Repositoty.Interfaces;

namespace socnet.Infrastructure.Service
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IProfileService _profileService;

        public GroupService(IGroupRepository groupRepository, IProfileService profileService)
        {
            _profileService = profileService;
            _groupRepository = groupRepository;
        }
        public bool AddMember(string slug, int profileId, MembershipLevel role = MembershipLevel.User)
        {
            var group = GetGroupBySlug(slug, "members");
            return AddMember(group, profileId, role);
        }

        public bool AddMember(int groupId, int profileId, MembershipLevel role = MembershipLevel.User)
        {
            var group = GetGroupById(groupId, "members");
            return AddMember(group, profileId, role);
        }

        private bool AddMember(Group group, int profileId, MembershipLevel role = MembershipLevel.User)
        {
            if (group == null) return false;
            var user = _profileService.GetProfileById(profileId);
            if (user == null) return false;
            if (group.Members.Select(x => x.ProfileId).Contains(profileId)) return false;
            group.Members.Add(new Member { Profile = user, Role = role });
            _groupRepository.UpdateGroup(group);
            return true;
        }

        public bool AddMembers(string slug, IEnumerable<AddMemberVM> profiles)
        {
            var group = GetGroupBySlug(slug, "members");
            return AddMembers(group, profiles);
        }

        public bool AddMembers(int groupId, IEnumerable<AddMemberVM> profiles)
        {
            var group = GetGroupById(groupId, "members");
            return AddMembers(group, profiles);
        }

        private bool AddMembers(Group group, IEnumerable<AddMemberVM> profiles)
        {
            if (group == null) return false;
            if (profiles == null) return false;
            var membersIds = group.Members.Select(x => x.ProfileId).ToList();
            var distinctIds = profiles.Select(x => x.ProfileId).Except(membersIds);

            var newMembers = profiles.Where(x => distinctIds.Contains(x.ProfileId));

            foreach (var newMember in newMembers)
            {
                var usr = _profileService.GetProfileById(newMember.ProfileId);
                if (usr != null)
                {
                    group.Members.Add(new Member { ProfileId = newMember.ProfileId, Role = newMember.Role });
                }
            }
            try
            {
                _groupRepository.UpdateGroup(group);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public Group CreateGroup(string name, int ownerId, string slug = null)
        {
            var user = _profileService.GetProfileById(ownerId);
            if (user != null && !string.IsNullOrWhiteSpace(name))
            {
                Group newGroup = new Group
                {
                    GroupName = sanitizeInput(name),
                    Members = new List<Member>
                    {
                        new Member { Profile = user, Role = MembershipLevel.Admin }
                    }
                };
                if (slug != null)
                {
                    var gr = GetGroupBySlug(slug);
                    if (gr != null)
                    {
                        newGroup.GroupSlug = sanitizeInput(slug).Replace("-", "");
                    }
                }
                try
                {
                    return _groupRepository.CreateGroup(newGroup);
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }

        public Group GetGroupById(int id, params string[] scope)
        {
            if (scope == null)
            {
                return _groupRepository.GetById(id);
            }
            else
            {
                List<Expression<Func<Group, object>>> includes = new List<Expression<Func<Group, object>>>();
                if (scope.Select(x => x.ToLower()).Contains("members"))
                {
                    includes.Add(x => x.Members);
                }
                if (scope.Select(x => x.ToLower()).Contains("posts"))
                {
                    includes.Add(x => x.Posts);
                }

                if (includes.Count == 1)
                {
                    return _groupRepository.GetById(id, includes[0]);
                }
                else if (includes.Count == 2)
                {
                    return _groupRepository.GetById(id, includes[0], includes[1]);
                }
                else
                {
                    return _groupRepository.GetById(id);
                }
            }
        }

        public Group GetGroupBySlug(string slug, params string[] scope)
        {
            if (scope == null)
            {
                return _groupRepository.GetBySlug(slug);
            }
            else
            {
                List<Expression<Func<Group, object>>> includes = new List<Expression<Func<Group, object>>>();
                if (scope.Select(x => x.ToLower()).Contains("members"))
                {
                    includes.Add(x => x.Members);
                }
                if (scope.Select(x => x.ToLower()).Contains("posts"))
                {
                    includes.Add(x => x.Posts);
                }

                if (includes.Count == 1)
                {
                    return _groupRepository.GetBySlug(slug, includes[0]);
                }
                else if (includes.Count == 2)
                {
                    return _groupRepository.GetBySlug(slug, includes[0], includes[1]);
                }
                else
                {
                    return _groupRepository.GetBySlug(slug);
                }
            }
        }

        public IEnumerable<Profile> GetMembers(string slug)
        {
            var group = GetGroupBySlug(slug, "members");
            return GetMembers(group);
        }

        public IEnumerable<Profile> GetMembers(int id)
        {
            var group = GetGroupById(id, "members");
            return GetMembers(group);
        }

        IEnumerable<Profile> GetMembers(Group group)
        {
            if (group == null) return null;
            return group.Members.Select(x => x.Profile).AsEnumerable();
        }

        public IEnumerable<Profile> GetMembersWithRole(string slug, MembershipLevel role)
        {
            var group = GetGroupBySlug(slug, "members");
            return GetMembersWithRole(group, role);
        }

        public IEnumerable<Profile> GetMembersWithRole(int id, MembershipLevel role)
        {
            var group = GetGroupById(id, "members");
            return GetMembersWithRole(group, role);
        }

        IEnumerable<Profile> GetMembersWithRole(Group group, MembershipLevel role)
        {
            if (group == null) return null;

            return group.Members.Where(x => x.Role == role).Select(x => x.Profile).AsEnumerable();
        }

        public IEnumerable<Group> GetUsersGroups(int profileId)
        {
            var memberships = _groupRepository.GetMembers(x => x.MemberId == profileId);
            return memberships.Select(x => x.Group).AsEnumerable();
        }

        public bool IsUserAdmin(int profileId, string slug)
        {
            var group = GetGroupBySlug(slug, "members");
            return IsUserAdmin(profileId, group);
        }

        public bool IsUserAdmin(int profileId, int groupId)
        {
            var group = GetGroupById(groupId, "members");
            return IsUserAdmin(profileId, group);
        }

        public bool IsUserAdmin(int profileId, Group group)
        {
            if (group == null) return false;
            var membership = group.Members.FirstOrDefault(x => x.ProfileId == profileId);

            return membership != null && membership.Role == MembershipLevel.Admin;
        }

        public bool RemoveMember(string slug, int profileId)
        {
            var group = GetGroupBySlug(slug, "members");
            return RemoveMember(group, profileId);
        }

        public bool RemoveMember(int groupId, int profileId)
        {
            var group = GetGroupById(groupId, "member");
            return RemoveMember(group, profileId);
        }

        bool RemoveMember(Group group, int profileId)
        {
            if (group == null || group.Members.Count == 1) return false;

            var membership = group.Members.FirstOrDefault(x => x.ProfileId == profileId);
            if (membership == null) return false;

            if (membership.Role == MembershipLevel.Admin
                && GetMembersWithRole(group, MembershipLevel.Admin).Count() == 1) return false;

            group.Members.Remove(membership);
            _groupRepository.UpdateGroup(group);

            return true;
        }

        public bool RemoveMembers(string slug, IEnumerable<int> profiles)
        {
            var group = GetGroupBySlug(slug, "members");
            return RemoveMembers(group, profiles);
        }

        public bool RemoveMembers(int groupId, IEnumerable<int> profiles)
        {
            var group = GetGroupById(groupId, "member");
            return RemoveMembers(group, profiles);
        }

        bool RemoveMembers(Group group, IEnumerable<int> profiles)
        {
            throw new NotImplementedException();
        }

        public bool SetName(string slug, string newName)
        {
            var group = GetGroupBySlug(slug, "members");
            return SetName(group, newName);
        }

        public bool SetName(int groupId, string newName)
        {
            var group = GetGroupById(groupId, "member");
            return SetName(group, newName);
        }

        bool SetName(Group group, string newName)
        {
            newName = sanitizeInput(newName);
            if (group == null || string.IsNullOrWhiteSpace(newName)) return false;
            group.GroupName = newName;
            _groupRepository.UpdateGroup(group);
            return true;
        }

        public bool SetSlug(int groupId, string slug)
        {
            slug = sanitizeInput(slug).Replace(" ", "-");

            if (string.IsNullOrWhiteSpace(slug)) return false;
            var newSlugGroup = GetGroupBySlug(slug);
            if (newSlugGroup != null) return false;
            var group = GetGroupById(groupId);
            if (group == null) return false;

            group.GroupSlug = slug;
            _groupRepository.UpdateGroup(group);
            return true;
        }

        public IEnumerable<Post> GetPosts(int groupId, int count, int skip, Expression<Func<Post, object>> orderBy, Expression<Func<Post, bool>> predicate = null)
        {
            var group = GetGroupById(groupId, "posts");
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        public IEnumerable<Post> GetPosts(string slug, int count, int skip, Expression<Func<Post, object>> orderBy, Expression<Func<Post, bool>> predicate = null)
        {
            var group = GetGroupBySlug(slug, "posts");
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        public IEnumerable<Post> GetPosts(Group group, int count, int skip, Expression<Func<Post, object>> orderBy, Expression<Func<Post, bool>> predicate = null)
        {
            if (group == null) return null;

            var query = group.Posts.AsQueryable();
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (orderBy != null)
            {
                query.OrderBy(orderBy);
            }

            return query.Skip(skip).Take(count).AsEnumerable();
        }

        private string sanitizeInput(string input) => input.Trim().Replace("\r", "").Replace("\n", "").Replace("\t", "");
    }
}
