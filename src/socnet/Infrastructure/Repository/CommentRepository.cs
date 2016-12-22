using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using socnet.Models;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Data;
using Microsoft.EntityFrameworkCore;

namespace socnet.Infrastructure.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _db;

        public CommentRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public Comment AddComment(Comment comment)
        {
            _db.Comments.Add(comment);
            _db.SaveChanges();
            return comment;
        }

        public bool DeleteComment(int id)
        {
            var comment = _db.Comments.Include(x => x.Rating).FirstOrDefault(x => x.Id == id);
            if (comment == null) return false;

            foreach (var rating in comment.Rating)
            {
                _db.Rates.Remove(rating);
            }
            _db.Comments.Remove(comment);
            _db.SaveChanges();
            return true;
        }

        public Comment GetCommentById(int id, params Expression<Func<Comment, object>>[] includes)
        {
            IQueryable<Comment> query = _db.Comments;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Comment> GetCommentsByQuery(Expression<Func<Comment, bool>> predicate, params Expression<Func<Comment, object>>[] includes)
        {
            IQueryable<Comment> query = _db.Comments;
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }
            return query.Where(predicate);
        }

        public Comment UpdateComment(Comment comment)
        {
            _db.Entry(comment).State = EntityState.Modified;
            _db.SaveChanges();
            return comment;
        }
    }
}
