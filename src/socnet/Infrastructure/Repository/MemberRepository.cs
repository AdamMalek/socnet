using socnet.Infrastructure.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using socnet.Models.DTO;
using System.Linq.Expressions;
using socnet.Data;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Repository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly ApplicationDbContext _db;

        public MemberRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public Member CreateMember(Member member)
        {
            _db.Members.Add(member);
            _db.SaveChanges();
            return member;
        }

        public bool DeleteMember(Member member)
        {
            _db.Members.Remove(member);
            _db.SaveChanges();
            return true;
        }

        public IEnumerable<Member> GetMembersWhere(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes)
        {
            IQueryable<Member> query = _db.Members;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public bool UpdateMember(Member member)
        {
            _db.Entry(member).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _db.SaveChanges();
            return true;
        }
    }
}
