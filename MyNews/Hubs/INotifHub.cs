using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using Models;

namespace Hubs
{
    public interface INotifHub
    {
         Task SendMessageToAll(string id,string naslov,string kratakTekst,string duziTekst,string slika,DateTime datumObjavljivanja,string kategorijaId);
        
         Task JoinGroup(string idKategorije);
    }
}