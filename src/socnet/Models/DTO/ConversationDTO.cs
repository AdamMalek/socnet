using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Models.DTO
{
    public class ConversationDTO
    {
        public int Id { get; set; }
        public int FriendId { get; set; }
        public List<MessageDTO> Messages { get; set; }
    }

    public class MessageDTO
    {
        public DateTime Date { get; set; }
        public string Message { get; set; }
        public int ProfileId { get; set; }
    }
}
