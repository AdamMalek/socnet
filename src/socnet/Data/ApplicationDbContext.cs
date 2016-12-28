using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using socnet.Models;

namespace socnet.Data
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Relation> Relationships { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Invite> Invites { get; set; }
        public DbSet<Conversation> Conversations { get; set; }


        public DbSet<Group> Groups { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentRate> CommentRates { get; set; }
        public DbSet<PostRate> PostRates { get; set; }
        public DbSet<Member> Members { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            
        }
    }
}
