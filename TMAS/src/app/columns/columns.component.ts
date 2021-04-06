import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { CardsService } from '../services/cards.service';
import { ColumnsService } from '../services/columns.service';
import { NewCard } from 'src/app/interfaces/new.card.interface';
import { Card } from '../interfaces/card.interface';
import { DragComponentComponent } from '../drag-component/drag-component.component';

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
  @ViewChild(DragComponentComponent) child: DragComponentComponent;
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
    console.log(this.cards.length);
    this.newCard = {
      title: this.newCardTitle,
      text: this.newCardText,
      columnId: this.column.id,
      SortBy: this.cards.length,
    };

    if (this.newCardTitle !== '') {
      this.cardsHttpService.createCard(this.newCard).subscribe(
        (response) => {
          console.log(response);
          this.getAll();
          this.child.getAll();
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

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column;
}
