using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using socnet.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Infrastructure.Extensions;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/Profile")]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{profileId:int}", Name = "ProfileGet")]
        public ProfileDTO Get(int profileId)
        {
            return _profileService.GetProfileById(profileId).ToDto();
        }
        
        // POST: api/Profile
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Profile/5
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
