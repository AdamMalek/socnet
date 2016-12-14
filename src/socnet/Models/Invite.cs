using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Invite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string InviteId { get; set; }
        public int senderId { get; set; }
        public int receiverId { get; set; }
    }
}
