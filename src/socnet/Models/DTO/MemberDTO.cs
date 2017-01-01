using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class MemberDTO
    {
        public int MemberId { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        public bool Admin { get; set; }
    }
}
