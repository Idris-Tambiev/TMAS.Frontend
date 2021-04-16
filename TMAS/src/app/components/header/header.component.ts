import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authPages: boolean = false;
  logStatus: boolean = true;
  user = {};
  searchText: string = '';
  constructor(
    private route: ActivatedRoute,
    private userHttpService: UserService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == '' || myRoute == 'registration') {
      this.authPages = true;
    } else {
      this.authPages = false;
      this.getName();
    }
    if (myRoute == 'registration') {
      this.logStatus = false;
    }
  }
  getSearchText(event: any) {
    this.searchService.searchText.next(event.target.value);
  }
  search() {
    this.searchService.searchText.next(this.searchText);
  }
  getName() {
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
