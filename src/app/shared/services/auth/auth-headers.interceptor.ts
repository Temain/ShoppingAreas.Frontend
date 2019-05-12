import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth_token = localStorage.getItem('auth_token');
    if (!!auth_token) {
     request = request.clone({
       setHeaders: {
         Authorization: `Bearer ${auth_token}`
       }
     });
    }
    return next.handle(request);
  }
}