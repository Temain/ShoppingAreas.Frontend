import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            // Auto logout on anuthorized response
            this.userService.logout();
            location.reload(true);
          }
          // const error = err.message || err.statusText;
          return throwError(err);
        })
      )
  }
}