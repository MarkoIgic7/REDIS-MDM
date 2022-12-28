using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Korisnik
    {

        [Required]
        public string Id { get; set; } = $"korisnik:{Guid.NewGuid().ToString()}";

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}