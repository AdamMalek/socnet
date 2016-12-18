﻿using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IGroupService
    {
        Group GetGroupById(int id,string[] scope = null);
        Group GetGroupBySlug(string slug, string[] scope = null);
        IEnumerable<Group> GetUsersGroups(int profileId);
        bool IsUserAdmin(int profileId, int groupId);
        bool IsUserAdmin(int profileId, string slug);

        Group CreateGroup(string name, int ownerId, string slug = null);
        bool AddMember(int groupId, int profileId, MembershipLevel role = MembershipLevel.User);
        bool AddMember(string slug, int profileId, MembershipLevel role = MembershipLevel.User);
        bool AddMembers(int groupId, IEnumerable<AddMemberVM> profiles);
        bool AddMembers(string slug, IEnumerable<AddMemberVM> profiles);
        bool RemoveMember(int groupId, int profileId);
        bool RemoveMember(string slug, int profileId);
        bool RemoveMembers(int groupId, IEnumerable<int> profiles);
        bool RemoveMembers(string slug, IEnumerable<int> profiles);

        bool SetSlug(int groupId, string slug);
        bool SetName(int groupId, string newName);
        bool SetName(string slug, string newName);

        IEnumerable<Profile> GetMembers(int id);
        IEnumerable<Profile> GetMembers(string slug);
        IEnumerable<Profile> GetMembersWithRole(int id, MembershipLevel role);
        IEnumerable<Profile> GetMembersWithRole(string slug, MembershipLevel role);

        IEnumerable<Post> GetPosts(int groupId, int count, int skip, Expression<Func<Post,object>> orderBy ,Expression<Func<Post, bool>> predicate = null);
        IEnumerable<Post> GetPosts(string slug, int count, int skip, Expression<Func<Post,object>> orderBy ,Expression<Func<Post, bool>> predicate = null);
    }
}
