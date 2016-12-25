using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IMemberService
    {
        bool CreateMember(int groupId, int profileId, MembershipLevel role);
        bool RemoveMember(int membershipId);
        bool RemoveMember(int groupId, int profileId);
        bool SetRole(int membershipId, MembershipLevel newRole);
        bool SetRole(int profileId, int groupId, MembershipLevel newRole);
        Member GetMembership(int membershipId);
        Member GetMembership(int groupId, int profileId);

        bool IsMember(int profileId, int groupId);
        bool IsInRole(int profileId, int groupId, MembershipLevel role);
        bool IsInRole(int membershipId, MembershipLevel role);

        IEnumerable<Member> GetGroupMembers(int groupId, params Expression<Func<Member, object>>[] includes);

        IEnumerable<Member> GetMembers(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes);
    }
}
