using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using socnet.Models;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate = null,params Expression<Func<User, object>>[] includeProperties);
        User GetUserById(int id,params Expression<Func<User, object>>[] includeProperties);
        User GetUserByUserName(string username, params Expression<Func<User, object>>[] includeProperties);
        User GetUserByEmail(string email, params Expression<Func<User, object>>[] includeProperties);
        User RegisterUser(string username, string password, ProfileData profile);
        User LoginUser(string username, string password);
        bool AddUserRole(int userId, string roleName);
        bool AddUserRole(string userName, string roleName);
        bool RemoveUserRole(int userId, string roleName);
        bool RemoveUserRole(string userName, string roleName);
        bool IsInRole(int userId, string role);
        bool IsInRole(string userName, string role);
        IEnumerable<string> GetRoles(int userId);
        IEnumerable<string> GetRoles(string userName);
    }
}
