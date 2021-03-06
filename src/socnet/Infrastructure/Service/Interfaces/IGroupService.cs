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
        void SendRequest(int groupId, int profileId);
        void AcceptRequest(string requestId);
        void DeclineRequest(string requestId);
        void CancelRequest(int groupId, int profileId);

        Group GetGroupById(int id,string[] scope = null);
        int? GetIdBySlug(string slug);
        Group GetGroupBySlug(string slug, string[] scope = null);
        IEnumerable<Group> GetUsersGroups(int profileId);

        Group CreateGroup(string name, int ownerId, string slug = null);

        void SetSlug(int groupId, string slug);
        void SetName(int groupId, string newName);
        void SetName(string slug, string newName);
        void SetDescription(string slug, string description);
        void SetDescription(int groupId, string description);        
        
        IEnumerable<GroupRequest> GetRequests(int groupId);
    }
}
