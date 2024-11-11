import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  standalone:true
})
export class ContactEditComponent implements OnInit {
  contact: Contact = new Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  }

  updateContact(): void {
    if (this.contact) {
      this.contactService.updateContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }
}
