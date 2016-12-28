using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public int Member1Id { get; set; }
        public int Member2Id { get; set; }
        public ICollection<Message> Messages { get; set; }
    }

    public class Message
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Body { get; set; }
        public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
    }
}
