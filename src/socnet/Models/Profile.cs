using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor;

namespace socnet.Models
{
    public class Profile
    {
        [Key]
        public int ProfileId { get; set; }
        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(20)]
        public string University { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        public string AvatarSrc { get; set; }
        public List<Relation> Friends { get; set; }
        public User User { get; set; }
    }
}
