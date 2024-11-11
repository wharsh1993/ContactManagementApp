import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  standalone:true,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
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
}



