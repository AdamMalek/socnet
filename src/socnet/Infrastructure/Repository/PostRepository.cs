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
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _db;

        public PostRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public Post CreatePost(Post post)
        {
            _db.Posts.Add(post);
            _db.SaveChanges();
            return post;
        }

        public bool DeletePost(int postId)
        {
            var post = GetPostById(postId);
            if (post == null) return false;

            foreach (var comment in post.Comments)
            {
                foreach (var rating in comment.Rating)
                {
                    _db.Rates.Remove(rating);
                }
                _db.Comments.Remove(comment);
            }
            foreach (var rating in post.Rating)
            {
                _db.Rates.Remove(rating);
            }
            _db.Posts.Remove(post);
            _db.SaveChanges();
            return true;
        }

        public Post GetPostById(int postId)
        {
            return _db.Posts.Include(x => x.Rating)
                            .Include(x => x.Comments)
                                .ThenInclude(x => x.Rating)
                            .Include(x => x.Profile)
                            .Include(x => x.Group)
                    .FirstOrDefault(x => x.Id == postId);
        }

        public IEnumerable<Post> GetPostsForGroup(int groupId, params Expression<Func<Post, object>>[] includes)
        {
            IQueryable<Post> query = _db.Posts;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.Where(x => x.GroupId == groupId).AsEnumerable();
        }

        public IEnumerable<Post> GetPostsForGroupWhere(int groupId, Expression<Func<Post, bool>> predicate, params Expression<Func<Post, object>>[] includes)
        {
            IQueryable<Post> query = _db.Posts;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.Where(x => x.GroupId == groupId).Where(predicate).AsEnumerable();
        }
        public IEnumerable<Post> GetPostsWhere(Expression<Func<Post, bool>> predicate, params Expression<Func<Post, object>>[] includes)
        {
            IQueryable<Post> query = _db.Posts;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public Post UpdatePost(Post post)
        {
            _db.Entry(post).State = EntityState.Modified;
            _db.SaveChanges();
            return post;
        }
    }
}
