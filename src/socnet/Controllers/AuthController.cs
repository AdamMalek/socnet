using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace socnet.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        // GET: api/Auth
        [Authorize]
        [HttpGet("logged")]
        public string Get()
        {
            return "loggedin";
        }

        [Authorize(Roles = "User")]
        [HttpGet("user")]
        public string Getusr()
        {
            return "user";
        }

        [HttpGet("all")]
        public string GetAll()
        {
            return "all";
        }

        [Authorize(Roles = "Admin,Moderator")]
        [HttpGet("admmod")]
        public string Getasd()
        {
            return "Admin or Moderator";
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("adm")]
        public string Getadm()
        {
            return "Admin";
        }

    }
}
