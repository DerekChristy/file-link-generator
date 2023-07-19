import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  session: any;
  admin = false;
  private onLoginChange = new BehaviorSubject<Object>({});
  onLoginChange$ = this.onLoginChange.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    if (this.session) {
      return;
    } else {
      this.updateSession();
      this.onLoginChange.next(this.session);
    }
  }
  updateSession() {
    const session = localStorage.getItem('session');
    if (session) {
      this.session = JSON.parse(session);
    }
  }
  newUser(data: any): Observable<any> {
    return this.http.post(environment.server + '/auth/new', data);
  }
  newSession(data: any) {
    localStorage.setItem('session', JSON.stringify(data));
    this.updateSession();
    this.onLoginChange.next(data);
  }
  getSessionToken() {
    return this.session?.['token'] ;
  }
  getSessionUser() {
    if (this.session) return this.session['user'];
  }
  login(data: any): Observable<any> {
    return this.http.post(environment.server + '/auth/login', data);
  }
  logout() {
    localStorage.removeItem('session');
    this.session = null;
    this.router.navigate(['/auth/login']);
  }
  isLoggedIn() {
    console.log(this.session);
    if (this.session && this.session['token']) return true;
    else return false;
  }
  activateAdmin() {
    this.admin = true;
  }
  isAdmin() {
    return this.admin;
  }
}
