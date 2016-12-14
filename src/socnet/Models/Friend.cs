using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Relation
    {
        [Key]
        public int RelationId { get; set; }
        [Required]
        [MaxLength(450)]
        public int FriendId { get; set; }

        public Profile Profile { get; set; }
        public int ProfileId { get; set; }
    }
}
