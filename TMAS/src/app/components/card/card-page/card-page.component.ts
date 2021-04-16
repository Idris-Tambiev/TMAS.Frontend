import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { IUserName } from 'src/app/interfaces/user-name.interface';
import { CardsService } from 'src/app/services/cards.service';
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
  constructor(
    private cardService: CardsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cardService.getOneCard(this.cardId).subscribe(
      (response) => {
        this.card = response;
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

  @Input() cardId: number;
  @Input() columnTitle: string;
}
