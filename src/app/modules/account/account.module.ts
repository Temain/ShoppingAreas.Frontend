import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRouter } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/auth/user.service';
import { SharedModule } from '../../shared/modules/shared.module';

import { AccountComponent } from './pages/account.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AccountRouter
  ],
  declarations: [AccountComponent, RegistrationFormComponent, LoginFormComponent],
  // providers: [UserService]
})
export class AccountModule { }
