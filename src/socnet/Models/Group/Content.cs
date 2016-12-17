using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Content
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        public List<Rate> Rating { get; set; }
        public int ProfileId { get; set; }
        [ForeignKey(nameof(ProfileId))]
        public Profile Profile { get; set; }
    }
}
