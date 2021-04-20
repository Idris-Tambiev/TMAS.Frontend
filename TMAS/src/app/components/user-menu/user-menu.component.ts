import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBoardAccess } from 'src/app/interfaces/board-access.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { BoardAccessService } from 'src/app/services/board-access.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  fileToUpload: File = null;
  userSelected: boolean = false;
  selectedUserEmail: string;
  users: IUser[] = [];
  boardAccess: IBoardAccess;
  currentBoardId: number;
  constructor(
    private userHttpService: UserService,
    private router: ActivatedRoute,
    private accesService: BoardAccessService
  ) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.currentBoardId = Number(routeParams.get('id'));
  }

  getUserName(event: any) {
    console.log(event.target.value);
    this.userHttpService.searchUsers(event.target.value).subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserEmail(event) {
    this.selectedUserEmail = event.value;
    this.userSelected = true;
    console.log(this.selectedUserEmail);
  }

  assignUser() {
    if (this.userSelected) {
      var userEmail = this.selectedUserEmail;
      var newUser: IUser = this.users.find(function (user, index, arr) {
        if (user.email === userEmail) {
          return user;
        }
      });

      this.boardAccess = {
        userId: newUser.id,
        boardId: this.currentBoardId,
      };

      this.accesService.create(this.boardAccess).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

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
