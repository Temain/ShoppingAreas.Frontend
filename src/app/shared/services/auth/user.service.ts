import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../common/base.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { UserRegistration } from '../../models/user.registration';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  baseUrl = '';
  user: User;

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('user'));
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = environment.apiUri;
  }

  register(userName: string, email: string, password: string, firstName: string
      , lastName: string, phoneNumber: string): Observable<UserRegistration> {
    const body = JSON.stringify({ userName, email, password, firstName, lastName, phoneNumber });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UserRegistration>(this.baseUrl + '/accounts', body, httpOptions)
      .pipe(
        // map(res => res.json()),
        catchError(this.handleError)
      );
  }

  login(userName, password): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }), httpOptions
      )
      .pipe(
        // map(res => res.json()),
        map((user: User) => {
          debugger
          localStorage.setItem('auth_token', user.auth_token);
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn = true;
          this.user = user;
          this._authNavStatusSource.next(true);
          return true;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.user = null;
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isAdmin() {
    if (this.loggedIn && this.user != null) {
      return this.user.role === 'api_admin';
    }
  }

  // facebookLogin(accessToken: string): Observable<any> {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   const body = JSON.stringify({ accessToken });
  //   return this.http
  //     .post(
  //     this.baseUrl + '/externalauth/facebook', body, { headers })
  //     .pipe(
  //       map((res: any) => {
  //         localStorage.setItem('auth_token', res.auth_token);
  //         this.loggedIn = true;
  //         this._authNavStatusSource.next(true);
  //         return true;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
}
