using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Comment: Content
    {
        public int PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public Group Post { get; set; }
    }
}
