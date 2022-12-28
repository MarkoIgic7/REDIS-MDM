using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Vest
    {
        [Required]
        public string Id { get; set; } = $"vest:{Guid.NewGuid().ToString()}";

        [Required]
        public string Naslov { get; set; }
        [Required]
        public string Tekst { get; set; }
        [Required]
        public DateTime DatumObjavljivanja { get; set; }

        [Required]
        public string KategorijaID { get; set; }

    }
}
