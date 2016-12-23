using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/group/{groupId:int}/posts", Name = "PostId")]
    [Route("api/group/{slug}/posts", Name = "PostSlug")]
    public class PostsController : Controller
    {
        // GET: api/Posts
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Posts/5
        [HttpGet("{postId}")]
        public string Get(string slug,int? groupId, int postId)
        {
            return groupId.ToString() + " " + postId.ToString();
        }
        // POST: api/Posts
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Posts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
