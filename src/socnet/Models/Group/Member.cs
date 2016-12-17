using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Member
    {
        [Key]
        public int MemberId { get; set; }

        public int GroupId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public Group Group { get; set; }

        public int ProfileId { get; set; }
        [ForeignKey(nameof(ProfileId))]
        public Profile Profile { get; set; }
        [Required]
        public MembershipLevel Role { get; set; } = MembershipLevel.User;
    }
    
    public enum MembershipLevel
    {
        User = 0,
        Admin = 1
    }
}
