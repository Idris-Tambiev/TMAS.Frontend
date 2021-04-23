import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  user: IUser = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  };
  confirmedPassword: string;
  passwordsInCorrected: boolean = false;

  myForm: FormGroup;
  constructor(
    private userHttpService: UserService,
    public router: Router,
    private validatorService: ValidatorService
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('', []),
      lastName: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.minLength(6),
        this.validatorService.passwordDigitsValidator,
        this.validatorService.passwordLowerCasevalidator,
        this.validatorService.passwordUpperCaseValidator,
        this.validatorService.passwordNonAlphanumericValidator,
      ]),
      confirmedPassword: new FormControl(''),
    });
    this.myForm.valueChanges.subscribe((x) => {
      console.log(this.myForm);
    });
  }

  ngOnInit(): void {}

  registrationUser() {
    console.log(this.myForm);
    this.user.userName = this.user.email;
    if (this.user.password === this.confirmedPassword) {
      this.passwordsInCorrected = false;
      this.userHttpService.createUser(this.user).subscribe(
        (response) => {
          console.log(response);
          this.getToken(this.user.userName, this.user.password);
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
    this.userHttpService.userAuthorization(userName, password).subscribe(
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
