import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/interfaces/new-history.interface';
import { UserActions } from 'src/app/enums/user-actions.enum';

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
    private historyHttpService: HistoryService
  ) {}
  ngOnInit(): void {}

  deleteThisCard() {
    this.httpService.deleteCard(this.card.id).subscribe(
      (response) => {
        this.createHistory(
          UserActions['Deleted card'],
          this.card.title,
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
          this.createHistory(
            UserActions['Checked card'],
            this.card.title,
            null,
            null
          );
        } else {
          this.createHistory(
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

  getUpdatedCard(event: any) {
    this.newTitle = event.target.value;
  }

  updateThisCard() {
    if (this.newTitle !== '') {
      const newCard = {
        id: this.card.id,
        title: this.newTitle,
      };
      this.httpService.updateCardTitle(newCard).subscribe(
        (response) => {
          this.updateCardsArray();
          this.createHistory(
            UserActions['Updated card'],
            this.newTitle,
            null,
            null
          );
        },
        (error) => console.log(error)
      );
    }
    this.editCard = false;
  }

  createHistory(action: number, actionObject: string, dest: number, source) {
    this.history = {
      ActionType: action,
      ActionObject: actionObject,
      DestinationAction: dest,
      SourceAction: source,
    };
    this.historyHttpService.createHistory(this.history).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }
  @Output() updateCardsList = new EventEmitter<number>();
  @Output() emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  @Input() card;
}
