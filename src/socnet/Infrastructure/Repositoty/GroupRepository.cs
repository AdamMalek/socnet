using socnet.Infrastructure.Repositoty.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using System.Linq.Expressions;
using socnet.Data;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Repositoty
{
    public class GroupRepository : IGroupRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IPostRepository _postRepository;
        private readonly IMemberRepository _memberRepository;

        public GroupRepository(ApplicationDbContext db, IPostRepository postRepository, IMemberRepository memberRepository)
        {
            _db = db;
            _postRepository = postRepository;
            _memberRepository = memberRepository;
        }
        public Group CreateGroup(Group group)
        {
            _db.Groups.Add(group);
            _db.SaveChanges();
            return group;
        }

        public bool DeleteGroup(int groupId)
        {
            var group = GetById(groupId,x=> x.Members, x=> x.Posts);
            if (group == null) return false;
            foreach (var member in group.Members)
            {
                _memberRepository.DeleteMember(member);
            }
            foreach (var post in group.Posts)
            {
                _postRepository.DeletePost(post.Id);
            }
            _db.Groups.Remove(group);
            _db.SaveChanges();
            return true;
        }

        public Group GetById(int groupId, params Expression<Func<Group, object>>[] includes)
        {
            IQueryable<Group> query = _db.Groups;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.FirstOrDefault(x => x.GroupId == groupId);
        }

        public Group GetBySlug(string slug, params Expression<Func<Group, object>>[] includes)
        {
            IQueryable<Group> query = _db.Groups;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.FirstOrDefault(x => x.GroupSlug == slug);
        }

        public IEnumerable<Group> GetGroups(Expression<Func<Group, bool>> predicate, params Expression<Func<Group, object>>[] includes)
        {
            IQueryable<Group> query = _db.Groups;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public IEnumerable<Member> GetMembers(Expression<Func<Member, bool>> predicate, params Expression<Func<Member, object>>[] includes)
        {
            IQueryable<Member> query = _db.Members;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public Group UpdateGroup(Group group)
        {
            _db.Entry(group).State = EntityState.Modified;
            _db.SaveChanges();
            return group;
        }
    }
}
