import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { EmailService } from 'src/app/services/email.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrls: ['./new-password-page.component.scss'],
})
export class NewPasswordPageComponent implements OnInit {
  incorrect = false;
  userId: string;
  token: string;
  isSuccess = false;
  email: string;
  message: string;

  myForm: FormGroup;
  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private userAuth: UserAuthService,
    private validatorService: ValidatorService
  ) {
    this.myForm = new FormGroup({
      password: new FormControl('', [
        Validators.minLength(6),
        this.validatorService.passwordDigitsValidator,
        this.validatorService.passwordLowerCasevalidator,
        this.validatorService.passwordUpperCaseValidator,
        this.validatorService.passwordNonAlphanumericValidator,
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['userid'];
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  resetPassword(form) {
    if (form.password === form.confirmPassword) {
      this.incorrect = false;
      this.emailService
        .confirmPassword(this.userId, this.token, form.password)
        .subscribe(
          (response) => {
            if (response.isSuccess) {
              this.message = response.message;
              this.isSuccess = true;
            }
          },
          (error) => {
            this.message = error.error.message;
            this.userAuth.redirect(false);
            this.isSuccess = false;
          }
        );
    } else {
      this.incorrect = true;
    }
  }

  login() {
    this.userAuth.login(this.email, this.myForm.value.password).subscribe(
      (response) => {
        localStorage.clear();
        localStorage.setItem('userToken', JSON.stringify(response));
        this.userAuth.redirect(true);
      },
      (error) => {
        console.log(error);
        this.userAuth.redirect(true);
      }
    );
  }
}
