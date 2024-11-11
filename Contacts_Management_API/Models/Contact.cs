using System.ComponentModel.DataAnnotations;

public class Contact
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
     public string LastName { get; set; }
     [EmailAddress]
    public string Email { get; set; }
    [Phone]
    public string Phone { get; set; }

}
