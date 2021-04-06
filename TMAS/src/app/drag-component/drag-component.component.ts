import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
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
      this.moveCard(movedCard, event.currentIndex);
    } else {
      console.log('other column');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  moveCard(movedCard, position) {
    movedCard.SortBy = position;
    this.cardsHttpService.moveCardPosition(movedCard).subscribe(
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
