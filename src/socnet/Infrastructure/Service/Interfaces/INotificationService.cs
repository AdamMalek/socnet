using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Service.Interfaces
{
    public interface INotificationService
    {
        void SendMessageNotification(int profileId,int messageId);
        void SendInvitationNotification(int profileId,int invitationId);
        void SendNotification(int profileId,int notificationId);
    }
}
