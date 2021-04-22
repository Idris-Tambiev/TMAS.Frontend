import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBoardAccess } from 'src/app/interfaces/board-access.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { BoardAccessService } from 'src/app/services/board-access.service';
import { BoardsService } from 'src/app/services/boards.service';
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

  deleteUserSelected: boolean = false;
  deleteUserEmail: string;

  users: IUser[] = [];
  boardAccess: IBoardAccess;
  currentBoardId: number;
  assign: boolean = false;
  boardCreator: boolean = false;
  deletedUserName: string;
  assignedUsers: IUser[] = [];
  deletedUser: IBoardAccess;

  constructor(
    private boardsService: BoardsService,
    private userHttpService: UserService,
    private router: ActivatedRoute,
    private accesService: BoardAccessService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.currentBoardId = Number(routeParams.get('id'));

    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == 'boards') {
      this.assign = false;
    } else {
      this.assign = true;
      this.checkUser();
    }
  }

  getUserName(event: any) {
    this.accesService
      .getAllUsers(this.currentBoardId, event.target.value)
      .subscribe(
        (response) => {
          this.users = response;
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  selectUser(event) {
    this.selectedUserEmail = event.value;
    this.userSelected = true;
  }

  checkUser() {
    this.boardsService.getOneBoard(this.currentBoardId).subscribe(
      (response) => {
        if (response) this.boardCreator = true;
        else this.boardCreator = false;
      },
      (error) => {
        console.log(error);
      }
    );
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
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getAssignedUserName(event) {
    this.deletedUserName = event.target.value;
    this.getAssignedUsers();
  }

  selectDeleteUser(event) {
    this.deletedUserName = event.value;
  }

  getAssignedUsers() {
    this.accesService
      .getAssignedUsers(this.currentBoardId, this.deletedUserName)
      .subscribe(
        (response) => {
          this.assignedUsers = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteUser() {
    var userEmail = this.deletedUserName;
    var newUser: IUser = this.assignedUsers.find(function (user, index, arr) {
      if (user.email === userEmail) {
        return user;
      }
    });

    this.deletedUser = {
      userId: newUser.id,
      boardId: this.currentBoardId,
    };

    this.accesService.deleteAccess(this.deletedUser).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fileUpload(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(formData);
    this.userHttpService.uploadPhoto(formData).subscribe(
      (response) => {
        this.ngOnInit();
        event.target.value = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
