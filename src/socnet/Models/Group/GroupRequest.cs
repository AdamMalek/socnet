using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class GroupRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string RequestId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int ProfileId { get; set; }
        public Profile Profile { get; set; }
    }
}
