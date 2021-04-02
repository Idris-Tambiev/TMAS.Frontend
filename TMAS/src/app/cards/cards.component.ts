import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  constructor(private httpService: CardsService) {}
  ngOnInit(): void {
    console.log(this.card);
  }
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();

  deleteThisCard() {
    this.httpService.deleteCard(this.card.id).subscribe(
      (response) => {
        console.log(response);
        this.updateCardsArray();
      },
      (error) => console.log(error)
    );
  }
  updateCardsArray() {
    this.deleteCard.emit(this.card.id);
  }
  @Output() deleteCard = new EventEmitter<number>();
  @Input() card;
}
