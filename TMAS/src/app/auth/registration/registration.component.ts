import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  newUser: IUser = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  };
  confirmedPassword: string;
  constructor(private userHttpService: UserService, public router: Router) {}

  ngOnInit(): void {}

  getUserName(event: any) {
    if (event.target.value != '') this.newUser.name = event.target.value;
  }
  getUserLastName(event: any) {
    if (event.target.value != '') this.newUser.lastName = event.target.value;
  }
  getUserEmail(event: any) {
    if (event.target.value != '') {
      this.newUser.email = event.target.value;
      this.newUser.userName = event.target.value;
    }
  }
  getUserPassword(event: any) {
    if (event.target.value != '') this.newUser.password = event.target.value;
  }
  confirmUserPassword(event: any) {
    if (event.target.value != '') this.confirmedPassword = event.target.value;
  }
  registrationUser() {
    if (
      this.newUser.password == this.confirmedPassword &&
      this.newUser.password != null &&
      this.newUser.email != null &&
      this.newUser.name != null &&
      this.newUser.lastName != null &&
      this.newUser.userName != null
    ) {
      this.userHttpService.createUser(this.newUser).subscribe(
        (response) => {
          console.log(response);
          this.getToken(this.newUser.userName, this.newUser.password);
        },
        (error) => {
          console.log(error);
        }
      );
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
