// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/auth/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if (!this.userService.isLoggedIn()) {
      debugger
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
