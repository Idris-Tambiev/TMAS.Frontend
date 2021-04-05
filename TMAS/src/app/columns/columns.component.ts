import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CardsService } from '../services/cards.service';
import { ColumnsService } from '../services/columns.service';
import { NewCard } from 'src/app/interfaces/new.card.interface';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  insertFormStatus: boolean = false;
  newCardTitle: string;
  newCardText: string = '';
  cards: Card[] = [];
  newCard: NewCard;

  constructor(
    private cardsHttpService: CardsService,
    private columnsHttpService: ColumnsService
  ) {}

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

  deleteThisColumn() {
    this.columnsHttpService.deleteColumn(this.column.id).subscribe(
      (response) => {
        this.updateColumnsList.emit();
      },
      (error) => console.log(error)
    );
  }

  createNewCard() {
    this.newCard = {
      title: this.newCardTitle,
      text: this.newCardText,
      columnId: this.column.id,
    };

    if (this.newCardTitle !== '') {
      this.cardsHttpService.createCard(this.newCard).subscribe(
        (response) => {
          this.getAll();
          this.getNewCardTitle(event);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  clickOnCancelButton() {
    this.insertFormStatus = false;
  }
  getNewCardTitle(event: any) {
    this.newCardTitle = event.target.value;
  }
  openInsertField() {
    this.insertFormStatus = true;
  }

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

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column;
}
