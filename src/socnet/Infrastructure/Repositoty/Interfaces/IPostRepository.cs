using socnet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repositoty.Interfaces
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetPostsForGroup(int groupId, params Expression<Func<Post, object>>[] includes);
        IEnumerable<Post> GetPostsForGroupWhere(int groupId,Expression<Func<Post,bool>> predicate, params Expression<Func<Post, object>>[] includes);
        IEnumerable<Post> GetPostsWhere(Expression<Func<Post,bool>> predicate, params Expression<Func<Post, object>>[] includes);
        Post GetPostById(int postId);

        Post CreatePost(Post post);
        Post UpdatePost(Post post);

        bool DeletePost(int postId);
    }
}
