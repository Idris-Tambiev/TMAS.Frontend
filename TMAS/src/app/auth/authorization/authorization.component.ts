import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  incorrectedData: boolean = false;
  email: string;
  pass: string;
  constructor(private httpService: UserService, public router: Router) {}

  ngOnInit(): void {}

  clickOnLoginButton(form: NgForm) {
    this.httpService.userAuthorization(this.email, this.pass).subscribe(
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

  redirect(type: boolean) {
    if (type) this.router.navigate(['boards']);
  }
}
