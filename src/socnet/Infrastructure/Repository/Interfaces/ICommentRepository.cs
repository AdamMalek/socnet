using socnet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface ICommentRepository
    {
        Comment AddComment(Comment comment);

        Comment UpdateComment(Comment comment);

        Comment GetCommentById(int id, params Expression<Func<Comment, object>>[] includes);
        IEnumerable<Comment> GetCommentsByQuery(Expression<Func<Comment,bool>> predicate, params Expression<Func<Comment, object>>[] includes);

        bool DeleteComment(int id);
    }
}
