
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using Models;

namespace Hubs
{
    public class Notif : Hub<INotifHub>
    {
        public async Task SendMessageToAll(string id,string naslov,string kratakTekst,string duziTekst,DateTime datum,string kategorijaId) 
        {
            await Clients.Group(kategorijaId).SendMessageToAll(id,naslov,kratakTekst,duziTekst,datum,kategorijaId);
             
        }
        
        public async Task JoinGroup(string idKategorije)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId,idKategorije);
        }

    }
}