﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Group
    {
        [Key]
        public int GroupId { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string GroupName { get; set; }
        public string GroupSlug { get; set; }
        public string Description { get; set; } = "This is default description, You can change it later in options";
        public List<Member> Members { get; set; }
        public List<Post> Posts { get; set; }
        public List<GroupRequest> Requests { get; set; }
    }
}
