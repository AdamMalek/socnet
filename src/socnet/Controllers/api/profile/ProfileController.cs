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
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using socnet.Models;

namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/Profile")]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly IHostingEnvironment _env;

        public ProfileController(IProfileService profileService, IHostingEnvironment env)
        {
            _profileService = profileService;
            _env = env;
        }

        [HttpGet("{profileId:int}", Name = "ProfileGet")]
        public ProfileDTO Get(int profileId)
        {
            return _profileService.GetProfileById(profileId).ToDto();
        }

        [HttpGet("x/{profileId:int}", Name = "html")]
        public ActionResult Prof(int profileId)
        {
            return View("Index",_profileService.GetProfileById(profileId).ToDto());
        }

        // POST: api/Profile
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public void Post([FromBody]string value)
        {
            // w przysz³oœci tworzenie miejsce na kod umo¿liwiaj¹cy tworzenie kilku profilu do jednego konta uzytkownika
        }

        // PUT: api/Profile/5
        [HttpPut("{profileId:int}")]
        [Authorize(Roles = "Self")]
        public void Put(int profileId, ProfileDTO data, IFormFile avatar)
        {
            var path = "#";
            if (ModelState.IsValid || true)
            {
                if (avatar != null)
                {
                    path = Path.Combine(_env.WebRootPath, "avatars", avatar.FileName);
                    using (var stream = avatar.OpenReadStream())
                    {
                        var buffer = new byte[stream.Length];
                        stream.Read(buffer, 0, buffer.Length);
                        System.IO.File.WriteAllBytes(path, buffer);
                    }
                    if (System.IO.File.Exists(path))
                    {
                        data.AvatarSrc = "avatars/" + avatar.FileName;
                    }
                }

                var result = _profileService.UpdateProfile(profileId, data) != null;
                if (result)
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
            else
            {
                Response.StatusCode = 400;
                return;
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles="Admin")]
        public void Delete(int id)
        {
            //w przyszlosci usuwanie profiu
        }
    }
}
