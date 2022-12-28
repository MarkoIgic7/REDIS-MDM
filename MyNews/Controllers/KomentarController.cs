using Microsoft.AspNetCore.Mvc;
using Models;

namespace MyNews.Controllers;

[ApiController]
[Route("[controller]")]
public class KomentarController : ControllerBase
{
    RedisRepo redis = new RedisRepo();

    [HttpPost]
    [Route("AddComment/{idVesti}")]
    public ActionResult AddComment([FromBody] Komentar komentar,string idVesti)
    {
        redis.DodavanjeKomentaraVesti(komentar,idVesti);
        return Ok("Dodat komentar");
    }
}