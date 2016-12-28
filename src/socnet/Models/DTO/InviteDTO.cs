using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class InviteDTO
    {
        public string InviteId { get; set; }
        public ProfileDTO Profile { get; set; }
        public ProfileDTO Friend { get; set; }
    }
}
