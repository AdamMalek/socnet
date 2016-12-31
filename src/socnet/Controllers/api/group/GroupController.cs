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
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;
        private IMemberService _memberService;
        private int ProfileId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "profileId").Value);
                }
                catch
                {
                    return -1;
                }
            }
        }

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
            return groupId;
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
        [HttpPut("{id}")]
        [Authorize(Roles = "GroupAdmin")]
        public void Put(int id, string slug)
        {
            Response.WriteAsync(_groupService.SetSlug(id, slug).ToString());
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "GroupAdmin")]
        public void Delete(int id)
        {
        }
    }
}
