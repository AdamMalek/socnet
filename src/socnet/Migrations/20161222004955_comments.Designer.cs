using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using socnet.Data;

namespace socnet.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20161222004955_comments")]
    partial class comments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("socnet.Models.Content", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body")
                        .IsRequired();

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<int>("ProfileId");

                    b.HasKey("Id");

                    b.HasIndex("ProfileId");

                    b.ToTable("Content");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Content");
                });

            modelBuilder.Entity("socnet.Models.Group", b =>
                {
                    b.Property<int>("GroupId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("GroupSlug");

                    b.HasKey("GroupId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("socnet.Models.Invite", b =>
                {
                    b.Property<string>("InviteId");

                    b.Property<int>("receiverId");

                    b.Property<int>("senderId");

                    b.HasKey("InviteId");

                    b.ToTable("Invites");
                });

            modelBuilder.Entity("socnet.Models.Member", b =>
                {
                    b.Property<int>("MemberId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GroupId");

                    b.Property<int>("ProfileId");

                    b.Property<int>("Role");

                    b.HasKey("MemberId");

                    b.HasIndex("GroupId");

                    b.HasIndex("ProfileId");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("socnet.Models.Profile", b =>
                {
                    b.Property<int>("ProfileId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AvatarSrc");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 20);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 20);

                    b.Property<string>("University")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 20);

                    b.HasKey("ProfileId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("socnet.Models.Rate", b =>
                {
                    b.Property<int>("RateId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContentId");

                    b.Property<int>("ProfileId");

                    b.Property<int>("Value");

                    b.HasKey("RateId");

                    b.HasIndex("ContentId");

                    b.HasIndex("ProfileId");

                    b.ToTable("Rates");
                });

            modelBuilder.Entity("socnet.Models.Relation", b =>
                {
                    b.Property<int>("RelationId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FriendId")
                        .HasAnnotation("MaxLength", 450);

                    b.Property<int>("ProfileId");

                    b.HasKey("RelationId");

                    b.HasIndex("ProfileId");

                    b.ToTable("Relationships");
                });

            modelBuilder.Entity("socnet.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.Property<int?>("UserId");

                    b.HasKey("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("socnet.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<int>("ProfileId");

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 20);

                    b.HasKey("UserId");

                    b.HasIndex("ProfileId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("socnet.Models.Comment", b =>
                {
                    b.HasBaseType("socnet.Models.Content");

                    b.Property<int>("PostId");

                    b.Property<int?>("PostId1");

                    b.HasIndex("PostId");

                    b.HasIndex("PostId1");

                    b.ToTable("Comment");

                    b.HasDiscriminator().HasValue("Comment");
                });

            modelBuilder.Entity("socnet.Models.Post", b =>
                {
                    b.HasBaseType("socnet.Models.Content");

                    b.Property<int>("GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("Post");

                    b.HasDiscriminator().HasValue("Post");
                });

            modelBuilder.Entity("socnet.Models.Content", b =>
                {
                    b.HasOne("socnet.Models.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("socnet.Models.Member", b =>
                {
                    b.HasOne("socnet.Models.Group", "Group")
                        .WithMany("Members")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("socnet.Models.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("socnet.Models.Rate", b =>
                {
                    b.HasOne("socnet.Models.Content", "Content")
                        .WithMany("Rating")
                        .HasForeignKey("ContentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("socnet.Models.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("socnet.Models.Relation", b =>
                {
                    b.HasOne("socnet.Models.Profile", "Profile")
                        .WithMany("Friends")
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("socnet.Models.Role", b =>
                {
                    b.HasOne("socnet.Models.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("socnet.Models.User", b =>
                {
                    b.HasOne("socnet.Models.Profile", "Profile")
                        .WithOne("User")
                        .HasForeignKey("socnet.Models.User", "ProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("socnet.Models.Comment", b =>
                {
                    b.HasOne("socnet.Models.Group", "Post")
                        .WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("socnet.Models.Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostId1");
                });

            modelBuilder.Entity("socnet.Models.Post", b =>
                {
                    b.HasOne("socnet.Models.Group", "Group")
                        .WithMany("Posts")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
