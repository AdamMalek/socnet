using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class ProfileData
    {
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
    }
}
