import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './pages/account.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AccountRouter {
}
