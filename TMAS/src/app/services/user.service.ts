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
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(this.configUrl + '/api/users/get');
  }

  getFullUser(userId: string): Observable<any> {
    const params = new HttpParams().set('id', userId);
    return this.http.get(this.configUrl + '/api/users/getfull', { params });
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(this.configUrl + '/api/users/create', user);
  }

  uploadPhoto(file): Observable<any> {
    return this.http.post(this.configUrl + '/api/users/upload/photo', file);
  }
  find(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.configUrl + '/api/users/find', { params });
  }
}
