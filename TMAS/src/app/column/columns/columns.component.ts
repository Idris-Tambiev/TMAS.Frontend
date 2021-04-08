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
import { DragCardComponent } from '../drag-components/cards-drag/drag-card.component';
import { Column } from '../interfaces/column.interface';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  insertFormStatus: boolean = false;
  newCardTitle: string;
  newCardText: string = '';
  cards: Card[] = [];
  newCard: NewCard;
  editColumn: boolean = false;
  newColumnTitle: string;
  newColumn: Column;
  @ViewChild(DragCardComponent) child: DragCardComponent;
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
    if (this.newCardTitle !== '') {
      this.newCard = {
        title: this.newCardTitle,
        text: this.newCardText,
        columnId: this.column.id,
        SortBy: this.cards.length,
      };
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

  getUpdateColumn(event: any) {
    this.newColumnTitle = event.target.value;
  }
  submitNewColumnTitle() {
    if (this.newColumnTitle != '') {
      this.newColumn = {
        Id: this.column.id,
        Title: this.newColumnTitle,
        BoardId: this.column.boardId,
        SortBy: this.column.SortBy,
      };
      this.columnsHttpService.updateColumn(this.newColumn).subscribe(
        (response) => {
          this.updateColumnsList.emit();
          this.editColumn = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.newColumnTitle === this.column.Title) {
      this.editColumn = false;
    }
  }

  columnUpdate() {
    this.editColumn = true;
  }

  getNewCardTitle(event: any) {
    this.newCardTitle = event.target.value;
  }

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column;
}
