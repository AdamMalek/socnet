using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.AspNetCore.TelemetryInitializers;
using Microsoft.Extensions.Options;
using socnet.Config;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;

namespace socnet.Infrastructure.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IProfileService _profileService;
        private readonly ConfigClass _cfg;

        public UserService(IUserRepository userRepository,IProfileService profileService ,IOptions<ConfigClass> cfg)
        {
            _userRepository = userRepository;
            _profileService = profileService;
            _cfg = cfg.Value;
        }
        public IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate = null, params Expression<Func<User, object>>[] includeProperties)
        {
            if (predicate != null)
            {
                return _userRepository.GetUsersIncluding(includeProperties, predicate).AsEnumerable();
            }
            else
            {
                return _userRepository.GetUsersIncluding(includeProperties).AsEnumerable();
            }
        }

        public User GetUserById(int id, params Expression<Func<User, object>>[] includeProperties)
        {
            return _userRepository.GetUserById(id, includeProperties);
        }

        public User GetUserByUserName(string username, params Expression<Func<User, object>>[] includeProperties)
        {
            return _userRepository.GetUsersIncluding(includeProperties, x => x.Username == username).FirstOrDefault();
        }

        public User GetUserByEmail(string email, params Expression<Func<User, object>>[] includeProperties)
        {
            return GetUsers(x => x.Profile.Email.ToLower().Equals(email.ToLower()),includeProperties).FirstOrDefault();
        }

        public User RegisterUser(string username, string password, ProfileDTO profileData)
        {
            if (username.Trim().Length == 0 || password.Length == 0) return null;
            if (GetUserByEmail(profileData.Email) != null) return null;
            User user = new User
            {
                Username = username.Trim(),
                Salt = Guid.NewGuid().ToString().Replace("-", ""),
                Profile = _profileService.CreateProfile(profileData)
            };
            user.PasswordHash = Hash(password, user.Salt);
            _userRepository.CreateUser(user);
            return user;
        }

        private string Hash(string pass, string salt)
        {
            var key = _cfg.CryptographicKey ?? "4e95f4b2ae1075e697695926a47c721d";
            System.Security.Cryptography.HMACSHA384 crypto = new HMACSHA384(Encoding.ASCII.GetBytes(key));
            return Convert.ToBase64String(crypto.ComputeHash(Encoding.ASCII.GetBytes(salt + pass)));
        }

        public User LoginUser(string username, string password)
        {
            var user = GetUserByUserName(username);
            if (user == null) return null;
            var hashedPassword = Hash(password, user.Salt);
            if (hashedPassword.Equals(user.PasswordHash))
            {
                return user;
            }
            return null;
        }

        public bool AddUserRole(int userId, string roleName)
        {
            var user = GetUserById(userId, x => x.Roles);
            return AddUserRole(user, roleName);
        }

        public bool AddUserRole(string userName, string roleName)
        {
            var user = GetUserByUserName(userName, x => x.Roles);
            return AddUserRole(user, roleName);
        }

        private bool AddUserRole(User user, string roleName)
        {
            if (user != null)
            {
                return _userRepository.AddRole(user, roleName);
            }
            return false;
        }

        public bool RemoveUserRole(int userId, string roleName)
        {
            var user = GetUserById(userId, x => x.Roles);
            return RemoveUserRole(user, roleName);
        }

        public bool RemoveUserRole(string userName, string roleName)
        {
            var user = GetUserByUserName(userName, x => x.Roles);
            return RemoveUserRole(user, roleName);
        }

        private bool RemoveUserRole(User user, string roleName)
        {
            if (user != null)
            {
                return _userRepository.RemoveRole(user, roleName);
            }
            return false;
        }

        public bool IsInRole(int userId, string role)
        {
            var user = GetUserById(userId, x => x.Roles);
            return IsInRole(user, role);
        }

        public bool IsInRole(string userName, string role)
        {
            var user = GetUserByUserName(userName, x => x.Roles);
            return IsInRole(user, role);
        }

        private bool IsInRole(User user, string role)
        {
            return user.Roles.Select(x => x.RoleName.ToLower()).Contains(role.ToLower());
        }

        public IEnumerable<string> GetRoles(int userId)
        {
            var user = GetUserById(userId, x => x.Roles);
            return GetRoles(user).AsEnumerable();
        }

        public IEnumerable<string> GetRoles(string userName)
        {
            var user = GetUserByUserName(userName, x => x.Roles);
            return GetRoles(user).AsEnumerable();
        }

        private IEnumerable<string> GetRoles(User user)
        {
            return user.Roles.Select(x => x.RoleName).AsEnumerable();
        }
    }
}
