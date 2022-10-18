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
        Task SendPrivateMessage(string connectId, CreateNotifyViewModel model);
    }
    public class NotifyHubService : Hub<INotifyHubService>
    {
        public async Task SendOffersToUser(CreateNotifyViewModel model)
        {
            await Clients.All.SendOffersToUser(model);
        }
        public Task SendPrivateMessage(string connectionID, CreateNotifyViewModel model)
        {
            var tmp = Clients.Client(connectionID).SendPrivateMessage(connectionID, model);
            return tmp;
        }
    }
}
