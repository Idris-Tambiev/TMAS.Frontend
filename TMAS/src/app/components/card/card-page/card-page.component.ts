import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { IUserName } from 'src/app/interfaces/user-name.interface';
import { CardsService } from 'src/app/services/cards.service';
import { OpenCardServiceService } from 'src/app/services/open-card-service.service';
import { UserService } from 'src/app/services/user.service';
import { CreateHistory } from 'src/app/services/create-history.service';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { FileService } from 'src/app/services/file.service';
import { IFile } from 'src/app/interfaces/file.interface';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  card: ICard = {
    title: '',
    sortBy: -1,
    text: '',
    columnId: 0,
  };
  user: IUserName = {
    name: '',
    lastName: '',
  };

  dateTime: Date;
  inputText: boolean = false;
  oldText: string;
  expiredPeriod: boolean = false;
  executionPeriod: number;
  currentTime: number;

  fileToUpload: File = null;
  files: IFile;
  constructor(
    private cardService: CardsService,
    private userService: UserService,
    private openCardService: OpenCardServiceService,
    private historyService: CreateHistory,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getCurrentCard();
    this.getName();
  }

  getCurrentCard() {
    this.cardService.getOneCard(this.cardId).subscribe(
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
    this.userService.getUserName().subscribe(
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
    console.log(this.card.executionPeriod);
  }

  closeCardWindow() {
    this.openCardService.getCard(null);
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
          this.createCardHistory(this.currentTime);
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

  createCardHistory(currentTime) {
    if (
      this.executionPeriod !== currentTime &&
      this.currentTime !== undefined
    ) {
      this.sendHistory(UserActions['Changed execution period of the card']);
    } else if (this.oldText !== this.card.text && this.oldText !== '') {
      this.sendHistory(UserActions['Edited description of the card']);
    } else if (this.oldText !== this.card.text && this.oldText === '') {
      this.sendHistory(UserActions['Added description of the card']);
    }
  }

  sendHistory(action) {
    this.historyService.createHistory(action, this.card.title, null, null);
  }

  fileUpload(files: FileList) {
    this.fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(formData);
    this.fileService.uploadFile(formData, this.card.id).subscribe(
      (response) => {
        console.log(response);
        this.getFiles();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  @Input() cardId: number;
  @Input() columnTitle: string;
}
