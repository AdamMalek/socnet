using socnet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Repository.Interfaces
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetPostsForGroup(int groupId);
        IEnumerable<Post> GetPostsForGroupWhere(int groupId,Expression<Func<Post,bool>> predicate);
        IEnumerable<Post> GetPostsWhere(Expression<Func<Post,bool>> predicate);
        Post GetPostById(int postId);

        Post CreatePost(Post post);
        Post UpdatePost(Post post);

        bool DeletePost(int postId);
    }
}
