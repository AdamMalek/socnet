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
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMemberService _memberService;
        private readonly IPostRepository _postRepository;
        private readonly IProfileService _profileService;

        public GroupService(IGroupRepository groupRepository, IProfileService profileService,
            IMemberService memberService, IPostRepository postRepository)
        {
            _memberService = memberService;
            _postRepository = postRepository;
            _profileService = profileService;
            _groupRepository = groupRepository;
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
                        new Member {Profile = user, Role = MembershipLevel.Admin}
                    }
                };
                if (slug != null)
                {
                    slug = sanitizeInput(slug).Replace("-", "");
                    var gr = GetGroupBySlug(slug);
                    if (gr == null)
                    {
                        newGroup.GroupSlug = slug;
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
                if (scope.Select(x => x.ToLower()).Contains("requests"))
                {
                    includes.Add(x => x.Requests);
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
                if (scope.Select(x => x.ToLower()).Contains("requests"))
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
            return _memberService.GetMembers(x => x.Group.GroupSlug == slug, x => x.Group).Select(x => x.Profile);
        }

        public IEnumerable<Profile> GetMembers(int id)
        {
            return _memberService.GetGroupMembers(id).Select(x => x.Profile);
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

            return _memberService.GetMembers(x => x.GroupId == group.GroupId && x.Role == role).Select(x => x.Profile);
        }

        public IEnumerable<Group> GetUsersGroups(int profileId)
        {
            var memberships = _memberService.GetMembers(x => x.ProfileId == profileId, x => x.Group);
            return memberships.Select(x => x.Group).AsEnumerable();
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

        public bool SetSlug(int groupId, string slug = "")
        {
            slug = sanitizeInput(slug).Replace(" ", "-").Replace(".", "").Replace(",", "");

            if (string.IsNullOrWhiteSpace(slug)) return false;
            if (slug[0] >= '0' && slug[0] <= '9') return false;
            var newSlugGroup = GetGroupBySlug(slug);
            if (newSlugGroup != null) return false;
            var group = GetGroupById(groupId);
            if (group == null) return false;

            group.GroupSlug = slug;
            _groupRepository.UpdateGroup(group);
            return true;
        }

        public IEnumerable<Post> GetPosts(int groupId, int count, int skip, Expression<Func<Post, object>> orderBy,
            Expression<Func<Post, bool>> predicate = null)
        {
            var group = GetGroupById(groupId, "posts");
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        public IEnumerable<Post> GetPosts(string slug, int count, int skip, Expression<Func<Post, object>> orderBy,
            Expression<Func<Post, bool>> predicate = null)
        {
            var group = GetGroupBySlug(slug, "posts");
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        public IEnumerable<GroupRequest> GetRequests(int groupId)
        {
            var requests = _groupRepository.GetRequestsWhere(x => x.GroupId == groupId, x => x.Profile);
            return requests;
        }

        public void SendRequest(int groupId, int profileId)
        {
            var group = GetGroupById(groupId, "requests");
            if (group == null) throw new ArgumentException("Group doesn't exist.");
            if (_memberService.IsMember(profileId, groupId))
                throw new ArgumentException("You are already a member of this group!");
            if (!_profileService.ProfileExists(profileId))
                throw new ArgumentException("Profile with specified profileId doesn't exist!");
            if (group.Requests.Any(x => x.ProfileId == profileId))
                throw new ArgumentException("You already sent request for this group!");
            var req = new GroupRequest
            {
                GroupId = groupId,
                ProfileId = profileId,
            };
            try
            {
                _groupRepository.AddRequest(req);
            }
            catch (Exception)
            {
                throw new ArgumentException("Database error!");
            }
        }

        public void AcceptRequest(string requestId)
        {
            var req = _groupRepository.GetRequestsWhere(x => x.RequestId == requestId).FirstOrDefault();
            if (req == null) throw new ArgumentException("Request doesn't exist");
            var group = GetGroupById(req.GroupId);
            if (group == null || !_profileService.ProfileExists(req.ProfileId) ||
                _memberService.IsMember(req.ProfileId, req.GroupId))
            {
                _groupRepository.RemoveRequest(requestId);
                throw new ArgumentException("Invalid request data!");
            }
            try
            {
                _memberService.CreateMember(req.GroupId, req.ProfileId, MembershipLevel.User);
                _groupRepository.RemoveRequest(requestId);
            }
            catch (Exception e)
            {
                throw new ArgumentException(e.Message);
            }
        }

        public void DeclineRequest(string requestId)
        {
            try
            {
                _groupRepository.RemoveRequest(requestId);
            }
            catch (Exception e)
            {
                throw new ArgumentException(e.Message);
            }
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

        private string sanitizeInput(string input) => input == null ? null : input.Trim().Replace("\r", "").Replace("\n", "").Replace("\t", "");

        public int? GetIdBySlug(string slug)
        {
            return _groupRepository.GetBySlug(slug)?.GroupId;
        }
    }
}
