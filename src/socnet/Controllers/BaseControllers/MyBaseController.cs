using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace socnet.Controllers
{
    public class MyBaseController: Controller
    {
        protected int ProfileId
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
        protected bool IsInRole(string roleName)
        {
            return User.HasClaim(x => x.Type == ClaimTypes.Role && x.Value == roleName);
        }
    }
}
