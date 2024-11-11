using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly ContactsService _contactsService;

    public ContactsController(ContactsService contactsService)
    {
        _contactsService = contactsService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
        Console.WriteLine("Inside contact");
        var contacts = await _contactsService.GetContactsAsync();
        return Ok(contacts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> GetContact(int id)
    {
        var contacts = await _contactsService.GetContactsAsync();
        var contact = contacts.FirstOrDefault(c => c.Id == id);
        if (contact == null)
        {
            return NotFound();
        }
        return Ok(contact);
    }

    [HttpPost]
    public async Task<ActionResult> PostContact(Contact contact)
    {
        var contacts = await _contactsService.GetContactsAsync();
        contact.Id = contacts.Max(c => c.Id) + 1;
        contacts.Add(contact);
        await _contactsService.SaveContactsAsync(contacts);
        return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutContact(int id, Contact contact)
    {
        var contacts = await _contactsService.GetContactsAsync();
        var existingContact = contacts.FirstOrDefault(c => c.Id == id);
        if (existingContact == null)
        {
            return NotFound();
        }

        existingContact.FirstName = contact.FirstName;
        existingContact.LastName = contact.LastName;
        existingContact.Email = contact.Email;
        existingContact.Phone = contact.Phone;
        await _contactsService.SaveContactsAsync(contacts);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var contacts = await _contactsService.GetContactsAsync();
        var contact = contacts.FirstOrDefault(c => c.Id == id);
        if (contact == null)
        {
            return NotFound();
        }

        contacts.Remove(contact);
        await _contactsService.SaveContactsAsync(contacts);
        return NoContent();
    }
}

