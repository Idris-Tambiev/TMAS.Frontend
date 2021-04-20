import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  socialUser: SocialUser;
  constructor(
    private socialAuthService: SocialAuthService,
    private httpService: UserService,
    public router: Router
  ) {}

  sendUserToken(token: string) {
    this.httpService.loginWithGoogle(token, 'google').subscribe(
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

  redirect(type: boolean) {
    if (type) this.router.navigate(['boards']);
  }

  logOut() {
    localStorage.clear();
  }
}
