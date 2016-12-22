using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Models;
using socnet.Models.DTO;
using socnet.Infrastructure.Repository.Interfaces;

namespace socnet.Infrastructure.Service
{
    public class PostService : IPostService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IGroupRepository _groupRepository;

        public PostService(IPostRepository postRepo, ICommentRepository commentRepo, IProfileRepository profileRepo, IGroupRepository groupRepo)
        {
            _postRepository = postRepo;
            _commentRepository = commentRepo;
            _profileRepository = profileRepo;
            _groupRepository = groupRepo;
        }
        public CommentDTO CommentPost(CommentDTO comment)
        {
            if ((_profileRepository.GetProfileByPredicate(x => x.ProfileId == comment.ProfileId) == null) ||
                (_postRepository.GetPostById(comment.PostId) == null)) return null;

            Comment newComment = fromDTO(comment);
            newComment.Rating = new List<Rate>();
            var comm = _commentRepository.AddComment(newComment);
            return toDTO(comm);
        }

        public PostDTO CreatePost(PostDTO post)
        {
            throw new NotImplementedException();
        }

        public bool DeleteComment(int commentId)
        {
            throw new NotImplementedException();
        }

        public bool DeletePost(int postId)
        {
            return _postRepository.DeletePost(postId);
        }

        public CommentDTO EditComment(int commentId, string newMessage)
        {
            var comm = _commentRepository.GetCommentById(commentId);
            comm.Body = newMessage;
            comm.LastModified = DateTime.UtcNow;
            _commentRepository.UpdateComment(comm);
            return toDTO(comm);
        }

        public PostDTO EditPost(int postId, string newMessage)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CommentDTO> GetComments(int postId)
        {
            throw new NotImplementedException();
        }

        public PostDTO GetPostById(int postId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostDTO> GetPostsByGroup(string slug)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostDTO> GetPostsByGroup(int groupId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostDTO> GetPostsByUser(int profileId)
        {
            throw new NotImplementedException();
        }

        public bool RateComment(int commentId, int profileId, RateType vote)
        {
            throw new NotImplementedException();
        }

        public bool RatePost(int postId, int profileId, RateType vote)
        {
            throw new NotImplementedException();
        }

        private Comment fromDTO(CommentDTO dto)
        {
            return new Comment
            {
                ProfileId = dto.ProfileId,
                PostId = dto.PostId,
                Body = dto.Content,
                Id = dto.Id,
            };
        }
        private CommentDTO toDTO(Comment comm) {
            var dto = new CommentDTO
            {
                Id = comm.Id,
                PostId = comm.PostId,
                ProfileId = comm.ProfileId,
                Content = comm.Body,
            };
            if (comm.Rating != null)
            {
                var ups = comm.Rating.Count(x => x.Value == RateType.UpVote);
                var downs = comm.Rating.Count(x => x.Value == RateType.DownVote);
                dto.Rating = ups - downs;
            }
            return dto;
        }
        private Post fromDTO(PostDTO dto) { }
        private PostDTO toDTO(Post comm) { }
    }
}
