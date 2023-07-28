import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { serverHost } from '../common/Const';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  endpoint: string = serverHost();

  post(serviceName: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http
      .post<any>(`${this.endpoint}/${serviceName}`, body, {
        headers: headers,
      })
      .pipe(
        catchError(error => {
          if ((error.error.code == 401)) {
            alert(error.error.message);
            this.authService.doLogout();
            return of([error]);
          }
          throw(error)
        }),
      );
  }
}
