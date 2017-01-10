using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Infrastructure.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using socnet.Models.DTO;
using socnet.Models;
using socnet.Infrastructure.Middleware;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/group/{groupId:int}/posts", Name = "PostId")]
    [Route("api/group/{slug}/posts", Name = "PostSlug")]
    [Authorize(Roles = "GroupMember")]
    public class PostsController : Controller
    {
        private readonly IGroupService _groupService;
        private readonly IPostService _postService;
        private readonly IMemberService _memberService;
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
        public PostsController(IGroupService groupService, IPostService postService, IMemberService memberService)
        {
            _groupService = groupService;
            _postService = postService;
            _memberService = memberService;
        }
        // GET: api/Posts
        [HttpGet]
        public IEnumerable<PostDTO> Get(string slug, int? groupId)
        {
            if (slug != null)
            {
                groupId = _groupService.GetIdBySlug(slug);
            }
            if (!groupId.HasValue)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("Error, group doesn't exist");
                return null;
            }
            return _postService.GetPosts(groupId.Value,100,0,x=> x.DateCreated);
        }

        // GET: api/Posts/5
        [HttpGet("{postId}")]
        public PostDTO Get(string slug, int? groupId, int postId)
        {
            if (slug != null)
            {
                groupId = _groupService.GetIdBySlug(slug);
            }
            if (!groupId.HasValue)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("Error, group doesn't exist");
                return null;
            }
            return _postService.GetPostById(postId);
        }
        // POST: api/Posts
        [HttpPost]
        public void Post(string slug, int? groupId, PostDTO post)
        {
            if (slug != null)
            {
                groupId = _groupService.GetIdBySlug(slug);
            }
            if (!ModelState.IsValid || post == null || groupId == null)
            {
                Response.StatusCode = 500;
                Response.WriteAsync("Model state invalid");
            }
            post.GroupId = groupId.Value;
            post.ProfileId = ProfileId;
            var p = _postService.CreatePost(post);
            if (p == null)
            {
                Response.StatusCode = 500;
                Response.WriteAsync("Internal server error");
            }
            else
            {
                Response.StatusCode = 201;
                Response.WriteAsync("OK");
            }

        }

        // PUT: api/Posts/5
        [HttpPut("{postId}")]
        public void Put(int postId, PostDTO post)
        {
            post.ProfileId = ProfileId;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{postId}")]
        public void Delete(int postId)
        {
            var post = _postService.GetPostById(postId);
            if (post == null)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("post not found");
            }
            else if (!User.HasClaim(x=> x.Value == "GroupAdmin") && post.ProfileId != ProfileId)
            {
                Response.StatusCode = 403;
                Response.WriteAsync("Not allowed");
            }
            else
            {
                if (_postService.DeletePost(postId))
                {
                    Response.StatusCode = 200;
                }
                else
                {
                    Response.StatusCode = 500;
                }
            }
        }
    }
}
