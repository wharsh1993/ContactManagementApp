import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [RouterOutlet,RouterLink,CommonModule],
  standalone:true
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(c => c.id !== id);
    });
  }
}

