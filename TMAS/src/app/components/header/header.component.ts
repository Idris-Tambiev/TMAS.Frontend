import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authPages = false;
  logStatus = true;
  user: IUser = { name: '', lastName: '', photo: '' };
  searchText: string = '';
  addPhoto = false;
  fileToUpload: File = null;
  constructor(
    private route: ActivatedRoute,
    private userHttpService: UserService,
    private searchService: BehaviorSubjectService
  ) {}

  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (
      myRoute == '' ||
      myRoute == 'registration' ||
      myRoute == 'reset' ||
      myRoute == 'new/pass'
    ) {
      this.authPages = true;
    } else {
      this.authPages = false;
      this.getUser();
    }
    if (myRoute == 'registration') {
      this.logStatus = false;
    }
  }
  getSearchText(event: any) {
    this.searchService.searchText.next(event.target.value);
  }

  getUser() {
    this.userHttpService.getUser().subscribe(
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

  getLogo() {
    return this.user.photo;
  }
}
