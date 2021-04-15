import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
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
  constructor(private userHttpService: UserService, public router: Router) {}

  ngOnInit(): void {}

  registrationUser(form: NgForm) {
    this.user.userName = this.user.email;
    console.log(this.user);
    this.userHttpService.createUser(this.user).subscribe(
      (response) => {
        console.log(response);
        this.getToken(this.user.userName, this.user.password);
      },
      (error) => {
        console.log(error);
      }
    );
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
