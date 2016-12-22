using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using socnet.Models;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate);
        IEnumerable<User> GetUsersIncluding(Expression<Func<User, object>>[] includeProperties, Expression<Func<User, bool>> predicate = null);
        User GetUserById(int id, params Expression<Func<User, object>>[] includeProperties);
        User CreateUser(User user);
        bool AddRole(User user,string role);
        bool RemoveRole(User user,string role);
    }
}
