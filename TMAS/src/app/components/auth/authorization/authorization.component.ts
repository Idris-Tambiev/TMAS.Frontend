import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  incorrectedData: boolean = false;
  email: string;
  pass: string;
  socialUser: SocialUser;

  constructor(
    public router: Router,
    private userAuth: UserAuthService,
    private socialAuthService: SocialAuthService,
    private httpService: UserService
  ) {}

  ngOnInit(): void {}

  clickOnLoginButton(form: NgForm) {
    this.Login(this.email, this.pass);
  }
  Login(email: string, password: string) {
    this.httpService.userAuthorization(email, password).subscribe(
      (response) => {
        this.incorrectedData = false;
        localStorage.clear();
        localStorage.setItem('userToken', JSON.stringify(response));
        this.userAuth.redirect(true);
      },
      (error) => {
        this.incorrectedData = true;
        this.userAuth.redirect(false);
        console.log(error);
      }
    );
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.userAuth.sendUserToken(this.socialUser.authToken);
      });
    });
  }
}
