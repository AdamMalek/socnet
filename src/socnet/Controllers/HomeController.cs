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
            Expression<Func<User,object>> ss = x => x.Profile;
             var user = _userService.GetUserByEmail(email,ss);
            
            //var user2 = _userService.LoginUser("test user", "hasslo16");
            //if (user2 != null)
            //{
            //    users.Add(user2);
            //}

            //var users = _userService.GetUsers(null,x=> x.Profile,x=> x.Profile.Friends);

            //users[0].Profile.Friends.Add(new Relation {FriendId = users[1].ProfileId});
            //users[1].Profile.Friends.Add(new Relation {FriendId = users[0].ProfileId});
            //_db.SaveChanges();
            return View("Index",user);
        }

        public IActionResult Index(int id)
        {
            var user = _userService.GetUserById(id,x=> x.Profile, x=> x.Profile.Friends);
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
            return View("Index",user);
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
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register( RegisterViewModel vm,string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var user = _userService.GetUserByUserName(vm.Username) ?? _userService.GetUserByEmail(vm.Email);
                if (user != null)
                {
                    ModelState.AddModelError("Username", "Username is taken");
                    return View(vm);
                }
                ProfileData p = new ProfileData
                {
                    Email = vm.Email,
                    FirstName = vm.FirstName,
                    LastName = vm.LastName,
                    University = vm.University
                };
                _userService.RegisterUser(vm.Username, vm.Password, p);

                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost:41940/login");
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded";
                req.Accept = "application/json";

                string postData = "username=" + vm.Username + "&password=" + vm.Password;
                byte[] byte1 = Encoding.ASCII.GetBytes(postData);

                Stream newStream = await req.GetRequestStreamAsync();
                newStream.Write(byte1, 0, byte1.Length);

                var res = await req.GetResponseAsync();

                return Json(res);
                //return RedirectToAction("Index");
            }
            return View(vm);
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
