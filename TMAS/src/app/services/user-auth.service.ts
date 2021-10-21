import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  configUrl: string = environment.Url;
  socialUser: SocialUser;
  constructor(public router: Router, private http: HttpClient) {}

  sendUserToken(accessToken: string) {
    this.loginWithGoogle(accessToken, 'google').subscribe(
      (response) => {
        localStorage.clear();
        localStorage.setItem('userToken', JSON.stringify(response));
        this.redirect(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loginWithGoogle(googleToken: string, provider: 'google'): Observable<object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const params = new HttpParams()
      .set('grant_type', 'external')
      .set('provider', provider)
      .set('scope', 'email profile openid api.read')
      .set('client_id', 'angular_spa_google')
      .set('external_token', googleToken);

    return this.http.post(this.configUrl + '/connect/token', params, {
      headers,
    });
  }

  login(userName: string, userPass: string): Observable<any> {
    const user = new HttpParams()
      .set('username', userName)
      .set('password', userPass)
      .set('scope', 'email profile openid api.read')
      .set('client_id', 'angular_spa')
      .set('grant_type', 'password');
    return this.http.post(this.configUrl + '/connect/token', user);
  }

  redirect(type: boolean) {
    if (type) this.router.navigate(['boards']);
  }

  logOut() {
    localStorage.clear();
  }
}
