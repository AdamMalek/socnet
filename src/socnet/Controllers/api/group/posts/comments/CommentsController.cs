using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/group/{groupId:int}/posts/{postId:int}/comments", Name = "CommentsId")]
    [Route("api/group/{slug}/posts/{postId:int}/comments", Name = "CommentsSlug")]
    [Authorize(Roles = "GroupMember")]
    public class CommentsController : Controller
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

        public CommentsController(IGroupService groupService, IPostService postService, IMemberService memberService)
        {
            _groupService = groupService;
            _postService = postService;
            _memberService = memberService;
        }

        [HttpGet]
        public IEnumerable<CommentDTO> Get(string slug, int? groupId, int postId)
        {
            SetGroupId(slug, ref groupId);
            var post = _postService.GetPostById(postId);
            if (post == null || post.GroupId != groupId.Value)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("No content");
                return null;
            }
            return post.Comments;
        }

        // GET: api/Comments/5
        [HttpGet("{commentId}")]
        public CommentDTO Get(string slug, int? groupId, int postId, int commentId)
        {
            SetGroupId(slug, ref groupId);
            var post = _postService.GetPostById(postId);
            if (post == null || post.GroupId != groupId.Value)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("No content");
                return null;
            }
            return post.Comments.FirstOrDefault(x => x.Id == commentId);
        }

        // POST: api/Comments
        [HttpPost]
        public void Post(string slug, int? groupId, int postId, CommentDTO comment)
        {
            SetGroupId(slug, ref groupId);
            if (ModelState.IsValid)
            {
                comment.GroupId = groupId.Value;
                comment.ProfileId = ProfileId;
                comment.PostId = postId;
                var result = _postService.CommentPost(comment);
                if (result == null)
                {
                    Response.StatusCode = 500;
                    Response.WriteAsync("Not successfull");
                    return;
                }
                else
                {
                    Response.StatusCode = 200;
                    return;
                }
            }
        }

        // PUT: api/Comments/5
        [HttpPut("{id:int}")]
        public void Put(string slug, int? groupId, int postId, CommentDTO comment)
        {
            SetGroupId(slug, ref groupId);
            if (string.IsNullOrWhiteSpace(comment.Content) || !_postService.IsInGroup(postId, groupId.Value))
            {
                Response.StatusCode = 404;
                return;
            }
            if (ProfileId != _postService.GetCommentAuthorId(comment.Id) && !IsGroupAdmin(groupId.Value))
            {
                Response.StatusCode = 403;
                return;
            }
            else
            {
                comment.GroupId = groupId.Value;
                comment.ProfileId = ProfileId;
                comment.PostId = postId;
                var res = _postService.EditComment(comment);
                if (res != null)
                {
                    Response.StatusCode = 200;
                    return;
                }
                else
                {
                    Response.StatusCode = 500;
                    return;
                }
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        private void SetGroupId(string slug, ref int? groupId)
        {
            if (slug != null)
            {
                var res = _groupService.GetIdBySlug(slug);
                if (res.HasValue)
                {
                    groupId = res.Value;
                }
            }
        }
        private bool IsGroupAdmin(int groupId)
        {
            return _memberService.IsInRole(ProfileId, groupId, Models.MembershipLevel.Admin);
        }
    }
}
