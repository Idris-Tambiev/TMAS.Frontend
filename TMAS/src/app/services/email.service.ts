import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  configUrl: string = environment.Url;
  constructor(private http: HttpClient) {}

  confirmEmail(userId: string, token: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('token', token);
    return this.http.get(this.configUrl + '/api/users/confirm/email', {
      params,
    });
  }

  sendEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.configUrl + '/api/users/reset', { params });
  }

  confirmPassword(
    userId: string,
    token: string,
    password: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('token', token)
      .set('password', password);
    return this.http.get(this.configUrl + '/api/users/confirm/new/password', {
      params,
    });
  }
}
