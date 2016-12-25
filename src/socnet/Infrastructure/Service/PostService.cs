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
        private readonly IMemberService _memberService;

        public PostService(IPostRepository postRepo,
            ICommentRepository commentRepo,
            IProfileRepository profileRepo,
            IGroupRepository groupRepo,
            IMemberService memberService)
        {
            _postRepository = postRepo;
            _commentRepository = commentRepo;
            _profileRepository = profileRepo;
            _groupRepository = groupRepo;
            _memberService = memberService;
        }
        public CommentDTO CommentPost(CommentDTO comment)
        {
            var post = GetPostById(comment.PostId);
            if (post == null || !_memberService.IsMember(comment.ProfileId, post.GroupId) || post.GroupId != comment.GroupId) return null;
            Comment newComment = fromDTO(comment);
            newComment.Rating = new List<CommentRate>();
            newComment.Id = 0;
            var comm = _commentRepository.AddComment(newComment);
            return toDTO(comm);
        }

        public PostDTO CreatePost(PostDTO post)
        {
            if (!_memberService.IsMember(post.ProfileId, post.GroupId) ||
                (_groupRepository.GetById(post.GroupId) == null))
                return null;

            Post newPost = fromDTO(post);
            if (newPost != null)
            {
                newPost = _postRepository.CreatePost(newPost);
            }
            return toDTO(newPost);
        }

        public bool DeleteComment(int commentId)
        {
            return _commentRepository.DeleteComment(commentId);
        }

        public bool DeletePost(int postId)
        {
            return _postRepository.DeletePost(postId);
        }

        public CommentDTO EditComment(int commentId, string newMessage)
        {
            var comm = _commentRepository.GetCommentById(commentId);
            if (comm == null) return null;
            comm.Body = newMessage;
            comm.LastModified = DateTime.UtcNow;
            _commentRepository.UpdateComment(comm);
            return toDTO(comm);
        }

        public PostDTO EditPost(int postId, string newMessage)
        {
            var post = _postRepository.GetPostById(postId);
            if (post == null) return null;
            post.Body = newMessage;
            post.LastModified = DateTime.UtcNow;
            post = _postRepository.UpdatePost(post);
            return toDTO(post);
        }

        public IEnumerable<CommentDTO> GetComments(int postId)
        {
            return _commentRepository.GetCommentsByQuery(x => x.PostId == postId).Select(x => toDTO(x));
        }

        public PostDTO GetPostById(int postId)
        {
            var post = _postRepository.GetPostById(postId);
            return toDTO(post);
        }

        public IEnumerable<PostDTO> GetPostsByGroup(string slug)
        {
            var posts = _postRepository.GetPostsWhere(x => x.Group.GroupSlug == slug);
            return posts.Select(x => toDTO(x));
        }

        public IEnumerable<PostDTO> GetPostsByGroup(int groupId)
        {
            return _postRepository.GetPostsForGroup(groupId).Select(x => toDTO(x));
        }

        public IEnumerable<PostDTO> GetPostsByUser(int profileId)
        {
            return _postRepository.GetPostsWhere(x => x.ProfileId == profileId).Select(x => toDTO(x));
        }

        public bool RateComment(int commentId, int profileId, RateType vote)
        {
            var comm = _commentRepository.GetCommentById(commentId, x => x.Post, x => x.Rating);
            if ((comm == null) ||
                (!_memberService.IsMember(profileId, comm.Post.GroupId))) return false;

            var rate = comm.Rating.FirstOrDefault(x => x.ProfileId == profileId);
            if (rate != null && rate.Value != vote)
            {
                rate.Value = vote;
            }
            else if (rate == null)
            {
                CommentRate r = new CommentRate
                {
                    ProfileId = profileId,
                    Value = vote
                };
                comm.Rating.Add(r);
            }
            return _commentRepository.UpdateComment(comm) != null;
        }

        public bool RatePost(int postId, int profileId, RateType vote)
        {
            var post = _postRepository.GetPostById(postId);
            if ((post == null) ||
                (!_memberService.IsMember(profileId, post.GroupId))) return false;

            var rate = post.Rating.FirstOrDefault(x => x.ProfileId == profileId);
            if (rate != null && rate.Value != vote)
            {
                rate.Value = vote;
            }
            else if (rate == null)
            {
                PostRate r = new PostRate
                {
                    ProfileId = profileId,
                    Value = vote
                };
                post.Rating.Add(r);
            }
            return _postRepository.UpdatePost(post) != null;
        }

        private Comment fromDTO(CommentDTO dto)
        {
            if (dto == null) return null;
            return new Comment
            {
                ProfileId = dto.ProfileId,
                PostId = dto.PostId,
                Body = dto.Content,
                Id = dto.Id,
            };
        }
        private CommentDTO toDTO(Comment comm)
        {
            if (comm == null) return null;
            var dto = new CommentDTO
            {
                Id = comm.Id,
                PostId = comm.PostId,
                ProfileId = comm.ProfileId,
                Content = comm.Body,
                GroupId = comm.Post.GroupId
            };
            if (comm.Rating != null)
            {
                var ups = comm.Rating.Count(x => x.Value == RateType.UpVote);
                var downs = comm.Rating.Count(x => x.Value == RateType.DownVote);
                dto.Rating = ups - downs;
            }
            return dto;
        }
        private Post fromDTO(PostDTO dto)
        {
            if (dto == null) return null;
            return new Post
            {
                ProfileId = dto.ProfileId,
                GroupId = dto.GroupId,
                Body = dto.Content,
                Id = dto.Id,
            };
        }
        private PostDTO toDTO(Post post)
        {
            if (post == null) return null;
            var dto = new PostDTO
            {
                Id = post.Id,
                GroupId = post.GroupId,
                ProfileId = post.ProfileId,
                Content = post.Body,
                Comments = new List<CommentDTO>()
            };
            if (post.Rating != null)
            {
                var ups = post.Rating.Count(x => x.Value == RateType.UpVote);
                var downs = post.Rating.Count(x => x.Value == RateType.DownVote);
                dto.Rating = ups - downs;
            }
            if (post.Comments != null)
            {
                foreach (var comment in post.Comments)
                {
                    dto.Comments.Add(toDTO(comment));
                }
            }
            return dto;
        }

        public bool IsInGroup(int postId, int groupId)
        {
            return _postRepository.GetPostsForGroupWhere(groupId, x => x.Id == postId).Count() == 1;
        }
    }
}
