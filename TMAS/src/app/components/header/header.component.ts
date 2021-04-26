import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authPages: boolean = false;
  logStatus: boolean = true;
  user: IUser = { name: '', lastName: '' };
  searchText: string = '';
  addPhoto: boolean = false;
  fileToUpload: File = null;
  defaultLogo: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private userHttpService: UserService,
    private searchService: BehaviorSubjectService,
    private userAuth: UserAuthService,
    public matDialog: MatDialog
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
        if (this.user.photo !== null) {
          this.defaultLogo = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logOut() {
    localStorage.clear();
  }

  public createPath = (fileName: string) => {
    return `https://localhost:44324/Files/${fileName}`;
  };
}
