using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class AddMemberDTO
    {
        public int ProfileId { get; set; }
        public MembershipLevel Role { get; set; }
    }
}
