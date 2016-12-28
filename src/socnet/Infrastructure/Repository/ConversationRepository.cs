using socnet.Infrastructure.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using System.Linq.Expressions;
using socnet.Data;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ApplicationDbContext _db;

        public ConversationRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public Conversation AddConversaion(Conversation conv)
        {
            try
            {
                _db.Conversations.Add(conv);
                _db.SaveChanges();
                return conv;
            }
            catch
            {
                return null;
            }
        }

        public Message AddMessage(Message msg)
        {
            try
            {
                _db.Set<Message>().Add(msg);
                _db.SaveChanges();
                return msg;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Conversation> GetByQuery(Expression<Func<Conversation, bool>> predicate,bool includeMsg=false)
        {
            IQueryable<Conversation> query = _db.Conversations;
            if (includeMsg)
            {
                query = query.Include(x => x.Messages);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public Conversation GetConversationBetween(int profile1Id, int profile2Id,bool includeMessages=false)
        {
            IQueryable<Conversation> query = _db.Conversations;
            if (includeMessages)
            {
                query = query.Include(x => x.Messages);
            }
            return query.Where(x => (x.Member1Id == profile1Id && x.Member2Id == profile2Id) || (x.Member1Id == profile2Id && x.Member2Id == profile1Id)).SingleOrDefault();
        }

        public IEnumerable<Conversation> GetProfileConversations(int profileId,bool messages)
        {
            IQueryable<Conversation> query = _db.Conversations;
            if (messages)
            {
                query = query.Include(x => x.Messages);
            }
            return query.Where(x => x.Member1Id == profileId || x.Member2Id == profileId).AsEnumerable();
        }

        public bool RemoveConversation(int id)
        {
            var conv = _db.Conversations.Include(x => x.Messages).FirstOrDefault(x => x.Id == id);
            foreach (var msg in conv.Messages)
            {
                _db.Set<Message>().Remove(msg);
                conv.Messages.Remove(msg);
            }
            _db.Conversations.Remove(conv);
            _db.SaveChanges();
            return true;
        }

        public bool UpdateConversation(Conversation conv)
        {
            try
            {
                _db.Entry(conv).State = EntityState.Modified;
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
