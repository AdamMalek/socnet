using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface IPostService
    {
        PostDTO CreatePost(PostDTO post);
        bool RatePost(int postId, int profileId, RateType vote);
        PostDTO EditPost(int postId, string newMessage);
        bool DeletePost(int postId);

        PostDTO GetPostById(int postId);
        IEnumerable<PostDTO> GetPostsByUser(int profileId);
        IEnumerable<PostDTO> GetPostsByGroup(int groupId);
        IEnumerable<PostDTO> GetPostsByGroup(string slug);

        IEnumerable<CommentDTO> GetComments(int postId);
        CommentDTO CommentPost(CommentDTO comment);
        bool RateComment(int commentId, int profileId, RateType vote);
        CommentDTO EditComment(int commentId, string newMessage);
        bool DeleteComment(int commentId);
    }
}
