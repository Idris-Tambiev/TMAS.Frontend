import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authPages: boolean = false;
  login: boolean = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == '' || myRoute == 'registration') {
      this.authPages = true;
    } else this.authPages = false;
    console.log(myRoute);
  }
  logOut() {
    localStorage.clear();
  }
}
