import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  configTokenUrl: string = environment.Url;
  constructor(private http: HttpClient) {}

  userAuthorization(userName: string, userPass: string): Observable<object> {
    const user = new HttpParams()
      .set('username', userName)
      .set('password', userPass)
      .set('scope', 'email profile openid api.read')
      .set('client_id', 'angular_spa')
      .set('grant_type', 'password');
    return this.http.post(this.configTokenUrl + '/connect/token', user);
  }
}
