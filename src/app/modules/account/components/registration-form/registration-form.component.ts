import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../../../shared/models/user.registration';
import { UserService } from '../../../../shared/services/auth/user.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
        this.userService.register(value.userName, value.email, value.password, value.firstName, value.lastName, value.phoneNumber)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], {queryParams: {brandNew: true, email: value.email}});
            }
          },
          error => this.errors = error);
    }
 }

}
