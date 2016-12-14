using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using socnet.Data;
using socnet.Infrastructure.Repositoty.Interfaces;
using socnet.Models;

namespace socnet.Infrastructure.Repositoty
{
    public class InviteRepository : IInviteRepository
    {
        private readonly ApplicationDbContext _db;

        public InviteRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public string CreateInvite(int senderId, int receiverId)
        {
            try
            {
                string id = Guid.NewGuid().ToString().Replace("-", "");
                _db.Invites.Add(new Invite
                {
                    senderId = senderId,
                    receiverId = receiverId,
                    InviteId = id
                });
                _db.SaveChanges();
                return id;
            }
            catch (Exception)
            {
                return "";
            }
        }

        public bool RemoveInvite(string inviteId)
        {
            var invite = GetInviteById(inviteId);
            if (invite != null)
            {
                _db.Invites.Remove(invite);
                _db.SaveChanges();
                return true;
            }
            return false;
        }

        public Invite GetInviteById(string id)
        {
            return _db.Invites.FirstOrDefault(x => x.InviteId == id);
        }

        public IEnumerable<Invite> GetInvites(Expression<Func<Invite, bool>> predicate)
        {
            return _db.Invites.Where(predicate);
        }
    }
}
