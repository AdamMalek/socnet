using socnet.Infrastructure.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Infrastructure.Extensions;
using socnet.Models;
using socnet.Models.DTO;
using socnet.Infrastructure.Repository.Interfaces;
using System.Linq.Expressions;

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

        public CommentDTO EditComment(CommentDTO comment)
        {
            var comm = _commentRepository.GetCommentById(comment.Id,x=> x.Post);
            if (comm == null || !isValid(comment.Content) ||
                comm.Post.Id != comment.PostId || comm.Post.GroupId != comment.GroupId) return null;
            comm.Body = comment.Content;
            comm.LastModified = DateTime.UtcNow;
            _commentRepository.UpdateComment(comm);
            return toDTO(comm);
        }

        private bool isValid(string content)
        {
            if (string.IsNullOrWhiteSpace(content)) return false;
            // reguly
            return true;
        }

        public PostDTO EditPost(PostDTO newPost)
        {
            var post = _postRepository.GetPostById(newPost.Id);
            if (post == null || !isValid(newPost.Content)) return null;
            post.Body = newPost.Content;
            post.LastModified = DateTime.UtcNow;
            post = _postRepository.UpdatePost(post);
            return toDTO(post);
        }

        public IEnumerable<CommentDTO> GetComments(int postId)
        {
            return _commentRepository.GetCommentsByQuery(x => x.PostId == postId,x=>x.Post,x=> x.Profile).Select(toDTO);
        }

        public PostDTO GetPostById(int postId)
        {
            var post = _postRepository.GetPostById(postId);
            return toDTO(post);
        }

        public IEnumerable<PostDTO> GetPostsByUser(int profileId)
        {
            return _postRepository.GetPostsWhere(x => x.ProfileId == profileId).Select(toDTO);
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
            if (comm.Profile != null)
            {
                dto.Profile = comm.Profile.ToDto();
            }
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
            if (post.Profile != null)
            {
                dto.Profile = post.Profile.ToDto();
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

        public int GetPostAuthorId(int postId)
        {
            return _postRepository.GetPostById(postId).ProfileId;
        }

        public int GetCommentAuthorId(int postId)
        {
            return _commentRepository.GetCommentById(postId).ProfileId;
        }

        public IEnumerable<PostDTO> GetPosts(int groupId, int count, int skip, Expression<Func<Post, object>> orderBy,
            Expression<Func<Post, bool>> predicate = null)
        {
            var group = _groupRepository.GetById(groupId, x => x.Posts);
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        public IEnumerable<PostDTO> GetPosts(string slug, int count, int skip, Expression<Func<Post, object>> orderBy,
            Expression<Func<Post, bool>> predicate = null)
        {
            var group = _groupRepository.GetBySlug(slug, x => x.Posts);
            return GetPosts(group, count, skip, orderBy, predicate);
        }

        private IEnumerable<PostDTO> GetPosts(Group group, int count, int skip, Expression<Func<Post, object>> orderBy, Expression<Func<Post, bool>> predicate = null)
        {
            if (group == null) return null;

            var query = group.Posts.AsQueryable();
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (orderBy != null)
            {
                query.OrderBy(orderBy);
            }

            return query.Skip(skip).Take(count).AsEnumerable().Select(toDTO);
        }
    }
}
