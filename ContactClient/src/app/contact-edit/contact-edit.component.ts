import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule],
    standalone:true
})
export class ContactEditComponent implements OnInit {
  contact: Contact = new Contact;
  contactForm!: FormGroup; 

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getContact();
      const contact: Contact = { id: 1, firstName: 'John', lastName: 'Doe',email:'alice.johnson@example.com',
         phone: '1234567890' };

    this.contactForm = this.fb.group({ id: [null], 
      firstName: ['', Validators.required],
       lastName: ['', Validators.required], 
       email: ['', [Validators.required, Validators.email]],
       phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]] });
       this.contactForm.patchValue(contact); 
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
