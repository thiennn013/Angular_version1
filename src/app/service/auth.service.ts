import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ultility } from './ultility.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:8023/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  token = '';
  lang = 'en';
  isSpin = false;
  currentUser: any = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-in
  signIn(component: any, user: any) {
    return this.http
      .post<any>(`${this.endpoint}/auth/authenticate`, user)
      .subscribe({
        next: (res: any) => {
          if (res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            for (let info in res.user) {
              localStorage.setItem(info, res.user[info]);
            }
            console.log(this.getProjectId());
            this.router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          Ultility.fnSetErrorMsg(component, error.error.fatalError);
          if (error.error.code == 401) {
            component['wrongMessage'] = 'Wrong username or password';
          }
        },
      });
  }
  getName() {
    return (
      localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname')
    );
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getProjectId() {
    return localStorage.getItem('projectId');
  }

  getProjectRole() {
    return localStorage.getItem('projectRole');
  }

  getLang() {
    return this.lang;
  }
  getToken() {
    return localStorage.getItem('access_token');
    // return this.token;
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    // let authToken = this.token;
    return authToken != null ? true : false;
  }

  doLogout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    this.http
      .post<any>(`${this.endpoint}/auth/logout`, {}, { headers: headers })
      .subscribe();
    localStorage.clear();
    this.router.navigate(['log-in']);
  }
}
