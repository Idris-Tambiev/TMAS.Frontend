import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, timer } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  confirmedPassword: string;
  passwordsInCorrected = false;
  subscription;
  myForm: FormGroup;
  message: string;

  constructor(
    private userHttpService: UserService,
    public router: Router,
    private validatorService: ValidatorService,
    private userAuth: UserAuthService
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      lastName: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.email]),
      userName: new FormControl(''),
      password: new FormControl('', [
        Validators.minLength(6),
        this.validatorService.passwordDigitsValidator,
        this.validatorService.passwordLowerCasevalidator,
        this.validatorService.passwordUpperCaseValidator,
        this.validatorService.passwordNonAlphanumericValidator,
      ]),
      confirmedPassword: new FormControl(''),
    });
    this.myForm.controls['email'].untouched;

    this.myForm.valueChanges.subscribe((x) => {
      this.myForm.value.userName = this.myForm.value.email;
      if (this.myForm.controls['email'].status == 'VALID') {
        this.timerForEmail();
      }
    });
  }

  ngOnInit(): void {}

  timerForEmail() {
    const source = timer(300);
    this.subscription = source.subscribe((x) => {
      this.findEmail();
    });
  }

  findEmail() {
    this.userHttpService.find(this.myForm.value.email).subscribe(
      (response) => {
        if (!response.isSuccess) {
          this.message = response.message;
        } else {
          this.message = '';
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.subscription.unsubscribe();
  }

  registrationUser(form) {
    if (form.password === form.confirmedPassword) {
      this.passwordsInCorrected = false;
      this.userHttpService.createUser(form).subscribe(
        (response) => {
          console.log(response);
          this.getToken(form.userName, form.password);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.passwordsInCorrected = true;
    }
  }

  getToken(userName, password) {
    this.userAuth.login(userName, password).subscribe(
      (response) => {
        localStorage.clear();
        localStorage.setItem('userToken', JSON.stringify(response));
        this.redirect(true);
      },
      (error) => {
        this.redirect(false);
        console.log(error);
      }
    );
  }

  redirect(type: boolean) {
    if (type) this.router.navigate(['boards']);
  }
}
