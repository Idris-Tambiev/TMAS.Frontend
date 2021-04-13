import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { CreateHistory } from 'src/app/services/create-history.service';
import { SearchService } from 'src/app/services/search.service';
import { ICard } from 'src/app/interfaces/card.interface';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  editCard = false;
  newTitle: string;
  history: History;

  constructor(
    private httpService: CardsService,
    private createHistoryService: CreateHistory
  ) {}

  ngOnInit(): void {}

  deleteThisCard() {
    const deletedCardName = this.card.title;
    this.httpService.deleteCard(this.card.id).subscribe(
      (response) => {
        this.createHistoryService.createHistory(
          UserActions['Deleted card'],
          deletedCardName,
          null,
          null
        );
        this.updateCardsArray();
      },
      (error) => console.log(error)
    );
  }

  updateCardsArray() {
    this.updateCardsList.emit();
  }

  checkCard(event: any) {
    const status = event.target.checked;
    console.log(status);
    this.httpService.cardCheck(this.card.id, status).subscribe(
      (response) => {
        if (status == true) {
          this.createHistoryService.createHistory(
            UserActions['Checked card'],
            this.card.title,
            null,
            null
          );
        } else {
          this.createHistoryService.createHistory(
            UserActions['Unchecked card'],
            this.card.title,
            null,
            null
          );
        }
        this.updateCardsArray();
      },
      (error) => console.log(error)
    );
  }

  updateThisCard() {
    if (this.newTitle !== '' && this.newTitle !== this.card.title) {
      const newCard = {
        id: this.card.id,
        title: this.newTitle,
      };
      this.httpService.updateCardTitle(newCard).subscribe(
        (response) => {
          this.updateCardsArray();
          this.createHistoryService.createHistory(
            UserActions['Updated card'],
            newCard.title,
            null,
            null
          );
        },
        (error) => console.log(error)
      );
    }
    this.editCard = false;
  }

  @Output() updateCardsList = new EventEmitter<number>();
  @Output() emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  @Input() card: ICard;
}
