using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using socnet.Infrastructure.Hubs;
using socnet.Infrastructure.Service.Interfaces;

namespace socnet.Infrastructure.Service
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext _hub;
        public IHubConnectionContext<dynamic> Clients { get; private set; }
        public IGroupManager Groups { get; private set; }
        protected NotificationService(IConnectionManager signalRConnectionManager)
        {
            _hub = signalRConnectionManager.GetHubContext<Broadcaster>();
            Clients = _hub.Clients;
            Groups = _hub.Groups;
        }
        public void SendMessageNotification(int profileId, int messageId)
        {
            Clients.Client(profileId.ToString()).SendMessage(new { messageId = messageId });
        }

        public void SendInvitationNotification(int profileId, int invitationId)
        {
            throw new NotImplementedException();
        }

        public void SendNotification(int profileId, int notificationId)
        {
            throw new NotImplementedException();
        }
    }
}
