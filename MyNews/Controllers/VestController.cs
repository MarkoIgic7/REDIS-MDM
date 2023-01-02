using Microsoft.AspNetCore.Mvc;
using Models;

namespace MyNews.Controllers;

[ApiController]
[Route("[controller]")]
public class VestController : ControllerBase
{
    RedisRepo redis = new RedisRepo();

    [HttpGet]
    [Route("getSveVesti")]
    public ActionResult<List<Vest>> getSveVesti()
    {
        //RedisRepo redis = new RedisRepo();
        var pom = redis.GetVesti();

        return Ok(pom.Select(p=>
        new{
            Id=p.Id,
            Naslov=p.Naslov,
            KraciTekst=p.KratakTekst,
            DuziTekst=p.DuziTekst,
            Datum=p.DatumObjavljivanja,
            Kategorija=redis.GetKategorija(p.KategorijaID)
        })

        );
    }

    [HttpPost]
    [Route("CreateVest/{naslov}/{kratakTekst}/{duziTekst}/{slika}/{kategorijaID}")]
    public ActionResult<Vest> CreateVest(string naslov,string kratakTekst,string duziTekst,string slika,string kategorijaID)
    {
        //RedisRepo f = new RedisRepo();
        Vest v = new Vest();
        v.Naslov = naslov;
        v.KratakTekst = kratakTekst;
        v.DuziTekst = duziTekst;
        v.Slika = slika;
        v.DatumObjavljivanja = DateTime.Now;
        v.KategorijaID = kategorijaID;
        redis.createVest(v);
        return Ok(v);
    }

    [HttpGet]
    [Route("VestSaKomentarima/{idVest}")]
    public ActionResult VestSaKomentarima(string idVest)
    {
        Vest v = redis.VestSaKomentarima(idVest);
        List<Komentar> listaKomentara = new List<Komentar>();
        listaKomentara = redis.SviKomentariVesti(idVest);

        return Ok(new{
            Id = v.Id,
            Naslov = v.Naslov,
            KraciTekst=v.KratakTekst,
            DuziTekst=v.DuziTekst,
            Datum = v.DatumObjavljivanja,
            Komentari = listaKomentara
        });
    }
    [HttpGet]
    [Route("getSveVestiOdredjeneKategorije/{idKategorije}")]
    public ActionResult<List<Vest>> getSveVestiOdredjeneKategorije(string idKategorije)
    {
        //RedisRepo redis = new RedisRepo();
        var pom = redis.GetVestiOdredjeneKategorije(idKategorije);
        
        return Ok(pom.Select(p=>
        new{
            Id=p.Id,
            Naslov=p.Naslov,
            KraciTekst=p.KratakTekst,
            DuziTekst=p.DuziTekst,
            Datum=p.DatumObjavljivanja,
            Kategorija=redis.GetKategorija(p.KategorijaID)
        })
        );
    }

    [HttpGet]
    [Route("GetPopularneVesti")]
    public ActionResult GetPopularneVesti()
    {
        List<Vest> popularneVesti = redis.getPopularneVesti();
        return Ok(popularneVesti);
    }

    [HttpPut]
    [Route("UpdateScore/{idVesti}")]
    public ActionResult UpdateScore(string idVesti)
    {
        return Ok(redis.UpdateScore(idVesti));
    }
    [HttpDelete]
    [Route("DeleteVest/{idVesti}")]
    public ActionResult DeleteVest(string idVesti)
    {
        redis.DeleteVest(idVesti);
        return  Ok();
    }
}