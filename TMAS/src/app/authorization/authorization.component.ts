import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  incorrectedData: boolean = false;
  userName: string;
  userPass: string;
  constructor(private httpService: UserService, public router: Router) {}

  ngOnInit(): void {}

  getUserName(event: any) {
    this.userName = event.target.value;
  }

  getUserPassword(event: any) {
    this.userPass = event.target.value;
  }

  clickOnLoginButton() {
    if (this.userName !== '' || this.userPass !== '') {
      this.httpService
        .userAuthorization(this.userName, this.userPass)
        .subscribe(
          (response) => {
            this.incorrectedData = false;
            localStorage.clear();
            localStorage.setItem('userToken', JSON.stringify(response));
            this.redirect(true);
          },
          (error) => {
            this.incorrectedData = true;
            this.redirect(false);
            console.log(error);
          }
        );
    }
  }

  redirect(type: boolean) {
    if (type) this.router.navigate(['boards']);
  }
}
