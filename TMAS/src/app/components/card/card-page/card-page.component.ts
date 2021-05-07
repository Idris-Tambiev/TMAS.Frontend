import { formatDate } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';
import { UserService } from 'src/app/services/user.service';
import { FileService } from 'src/app/services/file.service';
import { IFile } from 'src/app/interfaces/file.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  @Input() columnTitle: string;

  card: ICard = {
    title: '',
    sortBy: -1,
    text: '',
    columnId: 0,
  };
  user: IUser = {
    name: '',
    lastName: '',
    photo: '',
  };

  dateTime: Date;
  inputText = false;
  oldText: string;
  expiredPeriod = false;
  executionPeriod: number;
  currentTime: number;
  boardId: number;
  fileToUpload: File = null;
  files: IFile;

  constructor(
    private cardService: CardsService,
    private userService: UserService,
    private fileService: FileService,
    private router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
    }
  ) {}

  ngOnInit(): void {
    this.getCurrentCard();
    this.getName();
    this.boardId = this.router.snapshot.params.id;
  }

  getCurrentCard() {
    this.cardService.getOneCard(this.data.id).subscribe(
      (response) => {
        this.card = response;
        this.oldText = this.card.text;
        this.executionPeriod = Date.parse(this.card.executionPeriod.toString());
        this.checkDate();
        this.getFiles();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFiles() {
    this.fileService.getFiles(this.card.id).subscribe(
      (response) => {
        this.files = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getName() {
    this.userService.getUser().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkDate() {
    const now = new Date();
    if (this.executionPeriod <= now.getTime()) {
      this.expiredPeriod = true;
    } else {
      this.expiredPeriod = false;
    }
    if (this.card.executionPeriod.toString() === '0001-01-01T00:00:00') {
      this.expiredPeriod = false;
    }
  }

  saveChanges() {
    if (this.dateTime != undefined)
      this.currentTime = Date.parse(this.dateTime.toString());
    if (
      (this.executionPeriod !== this.currentTime &&
        this.currentTime !== undefined) ||
      this.card.text !== this.oldText
    ) {
      if (this.currentTime !== undefined)
        this.card.executionPeriod = this.dateTime;

      this.cardService.updateCardChanges(this.card).subscribe(
        (response) => {
          this.inputText = false;
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.inputText = false;
    }
  }

  fileUpload(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(formData);
    this.fileService.uploadFile(formData, this.card.id).subscribe(
      (response) => {
        console.log(response);
        this.getFiles();
        event.target.value = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
