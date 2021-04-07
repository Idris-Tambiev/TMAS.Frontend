import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  editCard = false;
  newTitle: string;
  constructor(private httpService: CardsService) {}
  ngOnInit(): void {}
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();

  deleteThisCard() {
    this.httpService.deleteCard(this.card.id).subscribe(
      (response) => {
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
        },
        (error) => console.log(error)
      );
    }
    this.editCard = false;
  }

  @Output() updateCardsList = new EventEmitter<number>();
  @Input() card;
}
