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
    const userId = this.route.snapshot.params['userid'];
    const token = this.route.snapshot.params['token'];
    console.log(token);
  }
}
