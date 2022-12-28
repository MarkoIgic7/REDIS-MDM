using Microsoft.AspNetCore.Mvc;
using Models;

namespace MyNews.Controllers;

[ApiController]
[Route("[controller]")]
public class KategorijaController : ControllerBase
{
    RedisRepo redis = new RedisRepo();

    [HttpGet]
    [Route("getKategorija/{id}")]
    public ActionResult<Kategorija> getKategorija(string id)
    {
        //RedisRepo redis = new RedisRepo();
        var pom = redis.GetKategorija(id);
        return Ok(pom);
    }

    [HttpPost]
    [Route("SetKategorija")]
    public ActionResult<Kategorija> SetKategorija([FromBody] Kategorija kategorija)
    {
        //RedisRepo f = new RedisRepo();
        redis.setKategorija(kategorija);
        return Ok(kategorija.Id);
    }
    [HttpGet]
    [Route("getKategorije")]
    public ActionResult<Kategorija> getKategorije()
    {
        //RedisRepo redis = new RedisRepo();
        var pom = redis.GetKategorije();
        return Ok(pom);
    }
}