import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'addcontacts', component: ContactAddComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'contacts/edit/:id', component: ContactEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
