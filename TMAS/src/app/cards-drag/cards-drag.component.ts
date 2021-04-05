import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-drag',
  templateUrl: './cards-drag.component.html',
  styleUrls: ['./cards-drag.component.css'],
})
export class CardsDragComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
      console.log(event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  @Input() cards;
  @Input() column;
}
