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

  constructor(
    private cardService: CardsService,
    private userService: UserService,
    private openCardService: OpenCardServiceService
  ) {}

  ngOnInit(): void {
    this.cardService.getOneCard(this.cardId).subscribe(
      (response) => {
        this.card = response;
        console.log(this.card.executionPeriod);
      },
      (error) => {
        console.log(error);
      }
    );

    this.userService.getUserName().subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeCardWindow() {
    console.log(this.dateTime);
  }
  saveChanges() {
    this.card.executionPeriod = this.dateTime;
    this.cardService.updateCardChanges(this.card).subscribe(
      (response) => {
        this.card = response;
        this.inputText = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  @Input() cardId: number;
  @Input() columnTitle: string;
}
