using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Models;
using socnet.Infrastructure.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/group/{groupId:int}/posts/{postId:int}/rating", Name = "PostRatingId")]
    [Route("api/group/{slug}/posts/{postId:int}/rating", Name = "PostRatingSlug")]
    [Authorize(Roles = "GroupMember")]
    public class PostsRatingsController : Controller
    {
        private readonly IGroupService _groupService;
        private readonly IPostService _postService;
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

        public PostsRatingsController(IGroupService groupService, IPostService postService)
        {
            _groupService = groupService;
            _postService = postService;
        }

        //public IEnumerable<Rate> Get(string slug, int? groupId, int postId, string rate)
        //{
        //}

        [HttpPost]
        public void Post(string slug, int? groupId, int postId, string rate)
        {
            var votes = new string[] { "up", "down" };
            if (slug != null)
            {
                groupId = _groupService.GetIdBySlug(slug);
            }
            var post = _postService.GetPostById(postId);
            if (post == null || post.GroupId != groupId.Value || rate == null)
            {
                Response.StatusCode = 404;
                Response.WriteAsync("Error");
                return;
            }
            else
            {
                RateType vote = RateType.UpVote;
                if (rate.ToLower().Equals("down"))
                {
                    vote = RateType.DownVote;
                }
                else if (rate.ToLower().Equals("up"))
                {
                    vote = RateType.UpVote;
                }
                else
                {
                    Response.StatusCode = 404;
                    Response.WriteAsync("Bad vote");
                    return;
                }
                var res = _postService.RatePost(postId, ProfileId, vote);
                if (res)
                {
                    Response.StatusCode = 200;
                    Response.WriteAsync("OK");
                }
                else
                {
                    Response.StatusCode = 500;
                    Response.WriteAsync("Error");
                }
            }
        }
    }
}
