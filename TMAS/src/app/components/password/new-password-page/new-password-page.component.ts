import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrls: ['./new-password-page.component.scss'],
})
export class NewPasswordPageComponent implements OnInit {
  newPassword: string;
  confirmedPassword: string;
  incorrect: boolean = false;
  userId: string;
  token: string;
  isSuccess: boolean = false;
  user: IUser = {
    name: '',
    lastName: '',
  };
  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['userid'];
    this.token = this.route.snapshot.queryParams['token'];
  }
  resetPassword() {
    if (this.newPassword == this.confirmedPassword) {
      this.incorrect = false;
      this.emailService
        .confirmPassword(this.userId, this.token, this.newPassword)
        .subscribe(
          (response) => {
            if (response.isSuccess) {
              this.isSuccess = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.incorrect = true;
    }
  }

  login() {
    this.userService.getFullUser(this.userId).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.userService
      .userAuthorization(this.user.email, this.newPassword)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
