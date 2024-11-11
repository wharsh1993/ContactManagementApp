import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  standalone:true
})
export class ContactAddComponent {
  contact: Contact = { id: 0, firstName: '',lastName:'', email: '', phone: '' };

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  addContact(): void {
    this.contactService.addContact(this.contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}
