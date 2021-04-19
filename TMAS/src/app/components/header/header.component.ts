import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
import { IUser } from 'src/app/interfaces/user.interface';
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
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == '' || myRoute == 'registration') {
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
  search() {
    this.searchService.searchText.next(this.searchText);
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

  fileUpload(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(formData);
    this.userHttpService.uploadPhoto(formData).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
        event.target.value = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
