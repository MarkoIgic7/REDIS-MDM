using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using Models;

namespace Hubs
{
    public interface INotifHub
    {
         Task SendMessageToAll(string id,string naslov,string kratakTekst,string duziTekst,DateTime datumObjavljivanja,string kategorijaId);
        
         Task JoinGroup(string idKategorije);
    }
}