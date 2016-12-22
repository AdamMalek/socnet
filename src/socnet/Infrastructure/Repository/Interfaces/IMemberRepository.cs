using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IMemberRepository
    {
        IEnumerable<Member> GetMembersWhere(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes);
        Member CreateMember(Member member);
        bool UpdateMember(Member member);
        bool DeleteMember(Member member);
    }
}
