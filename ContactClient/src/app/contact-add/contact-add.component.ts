import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule],
  standalone:true
})
export class ContactAddComponent {
  contact: Contact = { id: 0, firstName: '',lastName:'', email: '', phone: '' };
    contactForm: FormGroup;

  // constructor(
  //   private contactService: ContactService,
  //   private router: Router
  // ) { }

  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private router: Router
  ) { 
    this.contactForm = this.fb.group({ 
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      phone:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]]
     }); }

  addContact(): void {
    this.contact = this.contactForm.value;
    this.contactService.addContact(this.contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}
