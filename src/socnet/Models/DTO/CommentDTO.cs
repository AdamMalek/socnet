﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public int GroupId { get; set; }
        public int PostId { get; set; }
        public int Rating { get; set; }
        public string Content { get; set; }
    }
}
