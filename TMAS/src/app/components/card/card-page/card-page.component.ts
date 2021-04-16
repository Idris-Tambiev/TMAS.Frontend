import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { IUserName } from 'src/app/interfaces/user-name.interface';
import { CardsService } from 'src/app/services/cards.service';
import { OpenCardServiceService } from 'src/app/services/open-card-service.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private cardService: CardsService,
    private userService: UserService,
    private openCardService: OpenCardServiceService
  ) {}

  ngOnInit(): void {
    this.cardService.getOneCard(this.cardId).subscribe(
      (response) => {
        this.card = response;
        this.oldText = this.card.text;
        this.checkDate();
      },
      (error) => {
        console.log(error);
      }
    );

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
    const now = new Date().toLocaleString();
    if (this.card.executionPeriod.toLocaleString() < now) {
      this.expiredPeriod = true;
    }
  }

  closeCardWindow() {
    this.openCardService.getCard(null);
  }
  saveChanges() {
    if (
      (this.card.executionPeriod !== this.dateTime &&
        this.dateTime !== undefined) ||
      this.card.text !== this.oldText
    ) {
      if (this.dateTime !== undefined)
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

  @Input() cardId: number;
  @Input() columnTitle: string;
}
