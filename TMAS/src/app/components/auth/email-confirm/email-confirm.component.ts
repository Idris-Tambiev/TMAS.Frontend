import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IEmailConfirm } from 'src/app/interfaces/email-confirm.interface';
import { EmailService } from 'src/app/services/email.service';
@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}
  confirmResponse: IEmailConfirm = {
    message: '',
    isSuccess: false,
    errors: '',
    expireDate: null,
  };

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['userid'];
    const token = this.route.snapshot.queryParams['token'];
    this.emailService.confirmEmail(userId, token).subscribe(
      (response) => {
        this.confirmResponse = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
