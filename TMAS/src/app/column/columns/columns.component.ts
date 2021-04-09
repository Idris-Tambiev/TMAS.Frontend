import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { CardsService } from 'src/app/services/cards.service';
import { ColumnsService } from 'src/app/services/columns.service';
import { NewCard } from 'src/app/interfaces/new-card.interface';
import { Card } from 'src/app/interfaces/card.interface';
import { DragCardComponent } from 'src/app/card/cards-drag/drag-card.component';
import { Column } from 'src/app/interfaces/column.interface';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { CreateHistory } from 'src/app/services/create-history.service';
import { from } from 'rxjs';

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
  history: History;
  @ViewChild(DragCardComponent) child: DragCardComponent;
  constructor(
    private cardsHttpService: CardsService,
    private columnsHttpService: ColumnsService,
    private createHistoryService: CreateHistory
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
    const deletedColumnTitle = this.column.title;
    this.columnsHttpService.deleteColumn(this.column.id).subscribe(
      (response) => {
        this.updateColumnsList.emit();
        this.createHistoryService.createHistory(
          UserActions['Deleted column'],
          deletedColumnTitle,
          null,
          null
        );
      },
      (error) => console.log(error)
    );
  }

  createNewCard() {
    if (this.newCardTitle !== '' && this.newCardTitle != null) {
      this.newCard = {
        title: this.newCardTitle,
        text: this.newCardText,
        columnId: this.column.id,
        SortBy: this.cards.length,
      };
      this.cardsHttpService.createCard(this.newCard).subscribe(
        (response) => {
          console.log('create card');
          this.createHistoryService.createHistory(
            UserActions['Created card'],
            this.newCard.title,
            null,
            null
          );
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
        id: this.column.id,
        title: this.newColumnTitle,
        boardId: this.column.boardId,
        sortBy: this.column.SortBy,
      };
      this.columnsHttpService.updateColumn(this.newColumn).subscribe(
        (response) => {
          this.updateColumnsList.emit();
          this.editColumn = false;
          this.createHistoryService.createHistory(
            UserActions['Updated column'],
            this.newColumn.title,
            null,
            null
          );
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
