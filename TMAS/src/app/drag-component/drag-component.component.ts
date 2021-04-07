import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-drag-component',
  templateUrl: './drag-component.component.html',
  styleUrls: ['./drag-component.component.css'],
})
export class DragComponentComponent implements OnInit {
  cards = [];
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
      var movedCard = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      if (event.previousIndex !== event.currentIndex)
        this.moveCard(movedCard, event.currentIndex);
    } else {
      console.log('other column');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var Card = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      console.log(event.container.element.nativeElement.id);
      Card.columnId = event.container.element.nativeElement.id;
      Card.SortBy = event.currentIndex;
      this.moveCardColumn(Card);
    }
  }

  moveCard(movedCard, position: number) {
    movedCard.sortBy = position;
    console.log(movedCard);
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
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @Input() column;
}
