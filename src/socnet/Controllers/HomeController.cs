using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.ExpressionTranslators.Internal;
using Newtonsoft.Json;
using Remotion.Linq.Parsing.ExpressionVisitors.MemberBindings;
using socnet.Data;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;
using socnet.Models.AccountViewModels;
using socnet.Models.DTO;

namespace socnet.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserService _userService;

        public HomeController(IUserService userService)
        {
            _userService = userService;
        }
        public IActionResult Email(string email)
        {
            //_userService.RegisterUser("test user", "haslo16", new Profile
            //{
            //    Email = "test@test.com",
            //    FirstName = "test",
            //    LastName = "test",
            //    University = "xd"
            //});
            Expression<Func<User, object>> ss = x => x.Profile;
            var user = _userService.GetUserByEmail(email, ss);

            //var user2 = _userService.LoginUser("test user", "hasslo16");
            //if (user2 != null)
            //{
            //    users.Add(user2);
            //}

            //var users = _userService.GetUsers(null,x=> x.Profile,x=> x.Profile.Friends);

            //users[0].Profile.Friends.Add(new Relation {FriendId = users[1].ProfileId});
            //users[1].Profile.Friends.Add(new Relation {FriendId = users[0].ProfileId});
            //_db.SaveChanges();
            return View("Index", user);
        }

        public IActionResult Index(int id)
        {
            var user = _userService.GetUserById(id, x => x.Profile, x => x.Profile.Friends);
            return View(user);
        }
        public IActionResult Login(string login, string pass)
        {
            //_userService.RegisterUser("test user", "haslo16", new Profile
            //{
            //    Email = "test@test.com",
            //    FirstName = "test",
            //    LastName = "test",
            //    University = "xd"
            //});

            var users = new List<User>();
            var user = _userService.LoginUser(login, pass);
            if (user != null)
            {
                users.Add(_userService.GetUserById(user.UserId, x => x.Profile));
            }
            //var user2 = _userService.LoginUser("test user", "hasslo16");
            //if (user2 != null)
            //{
            //    users.Add(user2);
            //}

            //var users = _userService.GetUsers(null,x=> x.Profile,x=> x.Profile.Friends);

            //users[0].Profile.Friends.Add(new Relation {FriendId = users[1].ProfileId});
            //users[1].Profile.Friends.Add(new Relation {FriendId = users[0].ProfileId});
            //_db.SaveChanges();
            return View("Index", user);
        }

        [Authorize]
        public ActionResult Profile()
        {
            User data = _userService.GetUserById(Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type.Equals("id")).Value), x => x.Profile);

            return View((object)data);
        }

        public ActionResult Register()
        {
            return View(new RegisterViewModel());
        }
        [HttpPost("api/register")]
        [AllowAnonymous]
        public object Register(RegisterViewModel vm, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                if (_userService.GetUserByUserName(vm.Username) != null)
                {
                    ModelState.AddModelError("username", "Username is taken");
                }
                if (_userService.GetUserByEmail(vm.Email) != null)
                {
                    ModelState.AddModelError("email", "Email is taken");
                }
                if (ModelState.ErrorCount == 0)
                {
                    ProfileDTO p = new ProfileDTO
                    {
                        Email = vm.Email,
                        FirstName = vm.FirstName,
                        LastName = vm.LastName,
                        University = vm.University
                    };
                    var usr = _userService.RegisterUser(vm.Username, vm.Password, p);
                    if (usr != null)
                    {
                        return new
                        {
                            success = true
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            status = "Database error"
                        };
                    }
                }
            }
            var errors = ModelState.Select(x => new { key = x.Key, value = x.Value }).ToDictionary(x => x.key, x => x.value);
            return new
            {
                success = false,
                status = "model errors",
                errors = errors
            };
        }

        public bool AddRole(string username, string role)
        {
            return _userService.AddUserRole(username, role);
        }

        public bool RemoveRole(string username, string role)
        {
            return _userService.RemoveUserRole(username, role);
        }
        public IEnumerable<string> GetRoles(string username)
        {
            var roles = _userService.GetRoles(username);
            var enumerable = roles as string[] ?? roles.ToArray();
            return enumerable.ToList();
        }
    }
}
