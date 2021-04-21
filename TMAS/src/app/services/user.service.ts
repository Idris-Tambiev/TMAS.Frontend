import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  configUrl: string = environment.Url;
  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {}

  userAuthorization(userName: string, userPass: string): Observable<object> {
    const user = new HttpParams()
      .set('username', userName)
      .set('password', userPass)
      .set('scope', 'email profile openid api.read')
      .set('client_id', 'angular_spa')
      .set('grant_type', 'password');
    return this.http.post(this.configUrl + '/connect/token', user);
  }

  getUser(): Observable<any> {
    return this.http.get(this.configUrl + '/api/users/get');
  }
  getFullUser(userId: string): Observable<any> {
    const params = new HttpParams().set('id', userId);
    return this.http.get(this.configUrl + '/api/users/getfull', { params });
  }

  loginWithGoogle(token: string, provider: 'google'): Observable<object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const params = new HttpParams()
      .set('grant_type', 'external')
      .set('provider', provider)
      .set('scope', 'email profile openid api.read')
      .set('client_id', 'angular_spa_google')
      .set('external_token', token);

    return this.http.post(this.configUrl + '/connect/token', params, {
      headers,
    });
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(this.configUrl + '/api/users/create', user);
  }

  confirmEmail(userId: string, token: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('token', token);
    return this.http.get(this.configUrl + '/api/users/confirmemail', {
      params,
    });
  }

  uploadPhoto(file): Observable<any> {
    return this.http.post(this.configUrl + '/api/users/upload/photo', file);
  }

  searchUsers(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get(this.configUrl + '/api/users/get/users', {
      params,
    });
  }
}
