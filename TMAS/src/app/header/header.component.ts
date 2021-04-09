import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authPages: boolean = false;
  logStatus: boolean = true;
  user = {};
  constructor(
    private route: ActivatedRoute,
    private userHttpService: UserService
  ) {}

  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == '' || myRoute == 'registration') {
      this.authPages = true;
    } else this.authPages = false;
    if (myRoute == 'registration') {
      this.logStatus = false;
    }

    this.userHttpService.getUserName().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logOut() {
    localStorage.clear();
  }
}
