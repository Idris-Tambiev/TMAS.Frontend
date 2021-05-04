import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBoardAccess } from 'src/app/interfaces/board-access.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { BoardAccessService } from 'src/app/services/board-access.service';
import { BoardsService } from 'src/app/services/boards.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  fileToUpload: File = null;
  userSelected = false;
  selectedUserEmail: string = '';

  deleteUserSelected = false;
  deleteUserEmail: string;

  users: IUser[] = [];
  boardAccess: IBoardAccess;
  currentBoardId: number;
  assign = false;
  boardCreator = false;
  userAdded = false;
  userDeleted = false;
  deletedUserName: string = '';
  assignedUsers: IUser[] = [];
  deletedUser: IBoardAccess;
  subsciption;

  constructor(
    private boardsService: BoardsService,
    private userHttpService: UserService,
    private accesService: BoardAccessService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentBoardId = this.route.snapshot.params.id;
    const myRoute = this.route.snapshot.routeConfig.path;
    if (myRoute == 'boards') {
      this.assign = false;
    } else {
      this.assign = true;
      this.checkUser();
    }
  }

  getUserName(value: any) {
    if (value !== '') {
      this.accesService.getAllUsers(this.currentBoardId, value).subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  selectUser(email) {
    this.selectedUserEmail = email;
    this.userSelected = true;
  }

  checkUser() {
    this.boardsService.getOneBoard(this.currentBoardId).subscribe(
      (response) => {
        if (response) {
          this.boardCreator = true;
        } else {
          this.boardCreator = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  assignUser() {
    if (this.userSelected) {
      let newUser: IUser = this.users.find((user, index, arr) => {
        if (user.email === this.selectedUserEmail) {
          return user;
        }
      });
      this.boardAccess = {
        userId: newUser.id,
        boardId: this.currentBoardId,
      };
      this.accesService.create(this.boardAccess).subscribe(
        (response) => {
          this.userAdded = true;
          this.selectedUserEmail = '';
          this.users = [];
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getAssignedUserName(value) {
    if (value !== '') {
      this.deletedUserName = value;
      this.getAssignedUsers();
    }
  }

  selectDeleteUser(value) {
    this.deletedUserName = value;
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
    let newUser: IUser = this.assignedUsers.find((user, index, arr) => {
      if (user.email === this.deletedUserName) {
        return user;
      }
    });

    this.deletedUser = {
      userId: newUser.id,
      boardId: this.currentBoardId,
    };

    this.accesService.deleteAccess(this.deletedUser).subscribe(
      (response) => {
        this.userDeleted = true;
        this.deletedUserName = '';
        this.assignedUsers = [];
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
