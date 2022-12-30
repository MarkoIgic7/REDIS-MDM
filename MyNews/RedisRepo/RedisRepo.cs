using System.Text.Json;
using Models;
using ServiceStack.Redis;

public class RedisRepo
{
    RedisClient redis = new RedisClient("localhost:6379");
    public RedisRepo(){}

    public void setKategorija(Kategorija kat)
    {
        var serializedkat = JsonSerializer.Serialize<Kategorija>(kat);   
        redis.Set(kat.Id,serializedkat);
        redis.AddItemToSet("kategorije",serializedkat);
        
        
    }
    public Kategorija GetKategorija(string id)
    {
        var kat = redis.Get<string>(id);
        Kategorija kateg = JsonSerializer.Deserialize<Kategorija>(kat);
        return kateg;
    }
    public List<Kategorija> GetKategorije()
    {
        List<Kategorija> kategorije = new List<Kategorija>();
        var kategorijeIzRedisa = redis.GetAllItemsFromSet("kategorije");
        foreach(var k in kategorijeIzRedisa)
        {
            kategorije.Add(JsonSerializer.Deserialize<Kategorija>(k));
        }
        return kategorije;
    }

    public void createVest(Vest vest)
    {
        var serializedVest= JsonSerializer.Serialize<Vest>(vest);
        redis.Set(vest.Id,serializedVest);
        redis.AddItemToList("vesti",serializedVest);
        redis.AddItemToList(vest.KategorijaID+":vest",vest.Id);
    }

    public List<Vest> GetVesti()
    {
        var sveVesti=redis.GetAllItemsFromList("vesti");
        List<Vest> listaVesti= new List<Vest>();
        foreach (var vest in sveVesti)
        {
            listaVesti.Add(JsonSerializer.Deserialize<Vest>(vest));
        }

        return listaVesti;
    }

    public void DodavanjeKomentaraVesti(Komentar komentar,string idVesti)
    {
        var serializedComment = JsonSerializer.Serialize<Komentar>(komentar);
        redis.Set(komentar.Id,serializedComment); // dodat komentar u bazu

        var vestIzRedisa = redis.Get<string>(idVesti);
        Vest vest = JsonSerializer.Deserialize<Vest>(vestIzRedisa); // preuzeta vest za konkretan komentar

        redis.AddItemToList(vest.Id+":komentari",komentar.Id);

    }
    public List<Komentar> SviKomentariVesti(string idVest)
    {
        List<Komentar> komentari = new List<Komentar>(); 
        var vestIzRedisa = redis.Get<string>(idVest);
        Vest vest = JsonSerializer.Deserialize<Vest>(vestIzRedisa);

        var komentariIzRedisa = redis.GetAllItemsFromList(vest.Id+":komentari");
        foreach(var k in komentariIzRedisa)
        {
            komentari.Add(JsonSerializer.Deserialize<Komentar>(redis.Get<string>(k)));
        }
        return komentari;
    }

    public Vest VestSaKomentarima(string idVest)
    {
        var vestIzRedisa = redis.Get<string>(idVest);
        Vest vest = JsonSerializer.Deserialize<Vest>(vestIzRedisa);
        return vest;
    }

    public List<Vest> GetVestiOdredjeneKategorije(string kategorijaId)
    {
        var sveVestiOdredjeneKat=redis.GetAllItemsFromList(kategorijaId+":vest");
        List<Vest> listaVesti= new List<Vest>();
        foreach (var vest in sveVestiOdredjeneKat)
        {
            listaVesti.Add(JsonSerializer.Deserialize<Vest>(redis.Get<string>(vest)));
        }
        return listaVesti;
    }
    public Vest GetVest(string Id)
    {
        var vest = redis.Get<string>(Id);
        Vest v = JsonSerializer.Deserialize<Vest>(vest);
        return v;
    }
    public Korisnik RegisterAdmin()
    {
        var a=redis.Get<string>("admin@gmail.com");
        if(a==null)
        {
            Korisnik k= new Korisnik();
            k.Id="admin@gmail.com";
            k.Password="admin123";
            redis.Set(k.Id,JsonSerializer.Serialize<Korisnik>(k));
            return k;
        }
        return null;
    }

    public bool RegisterUser(Korisnik k)
    {
        var postojiKorisnik = redis.Get<string>(k.Id);
        if(postojiKorisnik==null)
        {
            var serializedKorisnik = JsonSerializer.Serialize<Korisnik>(k);
            redis.Add<string>(k.Id,serializedKorisnik);
            redis.AddItemToSet("korisnici",serializedKorisnik);
            return true;
        }
        else
            return false;
    }
    public bool Login(string username,string password)
    {
        if(username=="admin@gmail.com" && password=="admin123")
        {
            return true;
        }
        else
            return false;
    }
    public Korisnik GetKorisnik(string mail)
    {
        var serializedKorisnik = redis.Get<string>(mail);
        Korisnik k = JsonSerializer.Deserialize<Korisnik>(serializedKorisnik);
        return k;
    }
    
}