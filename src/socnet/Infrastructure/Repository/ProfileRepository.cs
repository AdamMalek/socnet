using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using socnet.Data;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Models;

namespace socnet.Infrastructure.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ApplicationDbContext _db;

        public ProfileRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public Profile GetProfileByPredicate(Expression<Func<Profile, bool>> predicate, params Expression<Func<Profile, object>>[] includes)
        {
            IQueryable<Profile> query = _db.Profiles;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.FirstOrDefault(predicate);
        }

        public Profile CreateProfile(Profile data)
        {
            _db.Profiles.Add(data);
            _db.SaveChanges();
            return data;
        }

        public bool UpdateProfile(Profile data)
        {
            _db.SaveChanges();
            return true;
        }

        public bool AddFriend(int senderId, int receiverId)
        {
            var sender = _db.Profiles.Include(x => x.Friends).FirstOrDefault(x => x.ProfileId == senderId);
            var receiver = _db.Profiles.Include(x => x.Friends).FirstOrDefault(x => x.ProfileId == receiverId);
            sender.Friends.Add(new Relation { FriendId = receiver.ProfileId, ProfileId = sender.ProfileId });
            receiver.Friends.Add(new Relation { FriendId = sender.ProfileId, ProfileId = receiver.ProfileId });
            _db.SaveChanges();
            return true;
        }

        public bool RemoveFriend(int senderId, int receiverId)
        {
            var sender = _db.Profiles.Include(x => x.Friends).FirstOrDefault(x => x.ProfileId == senderId);
            var receiver = _db.Profiles.Include(x => x.Friends).FirstOrDefault(x => x.ProfileId == receiverId);
            sender.Friends.Remove(sender.Friends.First(x => x.FriendId == receiverId));
            receiver.Friends.Remove(receiver.Friends.First(x => x.FriendId == senderId));
            _db.SaveChanges();
            return true;
        }

        public IEnumerable<Profile> GetProfilesByPredicate(Expression<Func<Profile, bool>> predicate, params Expression<Func<Profile, object>>[] includes)
        {
            IQueryable<Profile> query = _db.Profiles;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.Where(predicate).AsEnumerable();
        }
    }
}
