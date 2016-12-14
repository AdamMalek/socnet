using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace socnet.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(20)]
        public string Username  { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string Salt { get; set; }
        public List<Role> Roles { get; set; }
        public int ProfileId { get; set; }
        [ForeignKey(nameof(ProfileId))]
        public Profile Profile { get; set; }
     }
}
