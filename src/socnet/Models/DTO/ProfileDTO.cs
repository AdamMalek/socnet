using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class ProfileDTO
    {
        public int ProfileId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string University { get; set; }
        public string AvatarUrl { get; set; }
    }
}
