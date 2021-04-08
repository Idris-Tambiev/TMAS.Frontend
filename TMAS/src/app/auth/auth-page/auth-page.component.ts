import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  login: boolean = true;
  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == 'registration') this.login = false;
    else this.login = true;
  }
}
