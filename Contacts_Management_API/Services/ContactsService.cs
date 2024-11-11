using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;


public class ContactsService
{
    private readonly string _filePath = "Data/contacts.json";

    public async Task<List<Contact>> GetContactsAsync()
    {
        if (!File.Exists(_filePath))
        {
            return new List<Contact>();
        }

        var json = await File.ReadAllTextAsync(_filePath);
        return JsonSerializer.Deserialize<List<Contact>>(json);
    }

    public async Task SaveContactsAsync(List<Contact> contacts)
    {
        var json = JsonSerializer.Serialize(contacts);
        await File.WriteAllTextAsync(_filePath, json);
    }
}
