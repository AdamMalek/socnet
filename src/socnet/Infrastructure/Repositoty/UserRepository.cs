using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using socnet.Data;
using socnet.Infrastructure.Repositoty.Interfaces;
using socnet.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace socnet.Infrastructure.Repositoty
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext ctx)
        {
            _db = ctx;
        }

        public IEnumerable<User> GetUsers()
        {
            return _db.Users;
        }

        public IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate)
        {
            return _db.Users.Where(predicate);
        }

        public IEnumerable<User> GetUsersIncluding(Expression<Func<User, object>>[] includeProperties,
            Expression<Func<User, bool>> predicate = null)
        {
            IQueryable<User> query = _db.Set<User>();
            foreach (var include in includeProperties)
            {
                query = query.Include(include);
            }
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            return query.AsEnumerable();
        }


        public User GetUserById(int id, params Expression<Func<User, object>>[] includeProperties)
        {
            IQueryable<User> query = _db.Users;
            foreach (var include in includeProperties)
            {
                query = query.Include(include);
            }
            return query.FirstOrDefault(x => x.UserId == id);
        }

        public User CreateUser(User user)
        {
            if (user.PasswordHash.Length > 0 && user.Username.Length > 0)
            {
                _db.Users.Add(user);
                _db.SaveChanges();
                return user;
            }
            return null;
        }

        public bool AddRole(User user, string role)
        {
            role = role.Trim();
            if (role.Length == 0 || user == null) return false;
            try
            {
                role = role[0].ToString().ToUpper() + role.Substring(1).ToLower();
                if (user.Roles.Any(x => x.RoleName == role)) return false;
                user.Roles.Add(new Role { RoleName = role });
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool RemoveRole(User user, string roleName)
        {
            roleName = roleName.Trim();
            if (roleName.Length == 0 || user == null) return false;
            try
            {
                roleName = roleName[0].ToString().ToUpper() + roleName.Substring(1).ToLower();
                var role = user.Roles.FirstOrDefault(x => x.RoleName == roleName);
                if (role != null)
                {
                    user.Roles.Remove(role);
                    _db.Roles.Remove(role);
                }
                else
                {
                    return false;
                }
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
