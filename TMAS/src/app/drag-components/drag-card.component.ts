import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-drag-card',
  templateUrl: './drag-card.component.html',
  styleUrls: ['./drag-card.component.css'],
})
export class DragCardComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardsHttpService: CardsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cardsHttpService.getAllCards(this.column.id).subscribe(
      (response) => {
        this.cards = response;
      },
      (error) => console.log(error)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex);

      var movedCard: Card = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );

      if (event.previousIndex !== event.currentIndex)
        this.moveCard(movedCard, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var card: Card = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      card.ColumnId = parseInt(event.container.element.nativeElement.id);
      card.SortBy = event.currentIndex;
      this.moveCardColumn(card);
    }
  }

  moveCard(movedCard, position: number) {
    movedCard.sortBy = position;
    this.cardsHttpService.moveCardPosition(movedCard).subscribe(
      (response) => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  moveCardColumn(movedCard) {
    this.cardsHttpService.moveCardOnOtherColumn(movedCard).subscribe(
      (response) => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @Input() column;
}
