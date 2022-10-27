using _24HReportSystemData.ViewModel.Notify;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Service
{
    public interface INotifyHubService
    {
        Task SendOffersToUser(CreateNotifyViewModel model);
        Task SendPrivateMessage(string connectId, NotifyResponseViewModel model);
        Task SendPrivateMessageToUser(string connectionID, string msg);
    }
    public class NotifyHubService : Hub<INotifyHubService>
    {
        public async Task SendOffersToUser(CreateNotifyViewModel model)
        {
            await Clients.All.SendOffersToUser(model);
        }
        public Task SendPrivateMessage(string connectionID, NotifyResponseViewModel model)
        {
            var tmp = Clients.Client(connectionID).SendPrivateMessage(connectionID, model);
            return tmp;
        }
        public Task SendPrivateMessageToUser(string connectionID, string msg)
        {
            var tmp = Clients.Client(connectionID).SendPrivateMessageToUser(connectionID, msg);
            return tmp;
        }
    }
}
