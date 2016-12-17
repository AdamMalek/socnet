using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Rate
    {
        [Key]
        public int RateId { get; set; }
        [Required]
        public RateType Value { get; set; }
        public int ProfileId { get; set; }
        [ForeignKey(nameof(ProfileId))]
        public Profile Profile { get; set; }
        public int ContentId { get; set; }
        [ForeignKey(nameof(ContentId))]
        public Content Content { get; set; }
    }

    public enum RateType
    {
        DownVote = 0,
        UpVote = 1
    }
}
