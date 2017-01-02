using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Infrastructure.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using socnet.Models;
using System.Security.Claims;
using socnet.Models.DTO;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/Group")]
    [Authorize]
    public class GroupController : MyBaseController
    {
        private readonly IGroupService _groupService;
        private IMemberService _memberService;

        public GroupController(IGroupService groupService, IMemberService memberService)
        {
            _groupService = groupService;
            _memberService = memberService;
        }
        // GET: api/Group/5
        [HttpGet("{id:int}", Name = "GetId")]
        public GroupDTO Get(int id)
        {
            var group = _groupService.GetGroupById(id, new string[] { "posts" });
            if (group == null)
            {
                Response.StatusCode = 204;
                Response.WriteAsync("No group");
                return null;
            }
            else
            {
                return new GroupDTO
                {
                    groupId = group.GroupId,
                    GroupName = group.GroupName,
                    GroupSlug = group.GroupSlug,
                    Description = group.Description
                };
            }
        }

        [HttpGet("{slug}", Name = "GetSlug")]
        public GroupDTO Get(string slug)
        {
            var group = _groupService.GetGroupBySlug(slug, new string[] { "posts" });
            if (group == null)
            {
                Response.StatusCode = 204;
                Response.WriteAsync("No group");
                return null;
            }
            return new GroupDTO
            {
                groupId = group.GroupId,
                GroupName = group.GroupName,
                GroupSlug = group.GroupSlug,
                Description = group.Description
            };
        }

        [HttpGet("{slug}/id", Name = "GetIdBySlug")]
        public int? GetId(string slug)
        {
            var group = _groupService.GetIdBySlug(slug);
            return group;
        }
        [HttpGet("{groupId:int}/id")]
        public int? GetId(int groupId)
        {
            return _groupService.GetGroupById(groupId)?.GroupId;
        }
        // POST: api/Group
        [HttpPost]
        [Authorize]
        public void Post(string name, string slug = "")
        {
            var g = _groupService.CreateGroup(name, ProfileId, slug);
            if (g == null)
            {
                Response.StatusCode = 500;
                Response.WriteAsync("Error");
            }
            else
            {
                Response.StatusCode = 201;
                Response.WriteAsync($"Group created with id:{g.GroupId}");
            }
        }

        // PUT: api/Group/5
        [HttpPut("{groupId:int}")]
        [Authorize(Roles = "GroupAdmin")]
        public object Put(int groupId, GroupDTO data)
        {
            if (data == null)
            {
                Response.StatusCode = 400;
                return new
                {
                    success = false,
                    message = "Bad Request (empty data)"
                };
            }
            var group = _groupService.GetGroupById(groupId);
            if (group == null)
            {
                Response.StatusCode = 204;
                return new
                {
                    success = false,
                    message = "No group with given id"
                };
            }
            try
            {
                if (data.GroupName != null && group.GroupName != data.GroupName)
                {
                    _groupService.SetName(group.GroupId, data.GroupName);
                }
                if (data.GroupSlug != null && group.GroupSlug != data.GroupSlug)
                {
                    _groupService.SetSlug(group.GroupId, data.GroupSlug);
                }
                if (data.Description != null && group.Description != data.Description)
                {
                    _groupService.SetDescription(group.GroupId, data.Description);
                }
                return new
                {
                    success = true,
                    message = "OK"
                };
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                return new
                {
                    success = false,
                    message = e.Message
                };
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "GroupAdmin")]
        public void Delete(int id)
        {
        }
    }
}
