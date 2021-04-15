import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userHttpService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['userid'];
    const token = this.route.snapshot.queryParams['token'];
    console.log(token);

    this.userHttpService.confirmEmail(userId, token).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
