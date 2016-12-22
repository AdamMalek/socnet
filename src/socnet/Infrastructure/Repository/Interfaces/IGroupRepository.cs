using socnet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IGroupRepository
    {
        Group GetById(int groupId, params Expression<Func<Group, object>>[] includes);
        Group GetBySlug(string slug, params Expression<Func<Group, object>>[] includes);
        IEnumerable<Group> GetGroups(Expression<Func<Group, bool>> predicate, params Expression<Func<Group, object>>[] includes);
        bool DeleteGroup(int groupId);
        Group UpdateGroup(Group group);
        Group CreateGroup(Group group);

        IEnumerable<Member> GetMembers(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes);
    }
}
