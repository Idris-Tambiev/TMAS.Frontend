import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { CardsService } from 'src/app/services/cards.service';
import { ColumnsService } from 'src/app/services/columns.service';
import { ICard } from 'src/app/interfaces/card.interface';
import { DragCardComponent } from 'src/app/card/cards-drag/drag-card.component';
import { IColumn } from 'src/app/interfaces/column.interface';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { CreateHistory } from 'src/app/services/create-history.service';
import { from } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  insertFormStatus: boolean = false;
  newCardTitle: string;
  newCardText: string = '';
  newCard: ICard;
  editColumn: boolean = false;
  newColumnTitle: string;
  newColumn: IColumn;
  history: History;
  columnView: boolean = true;
  cardsCount: number;
  @ViewChild(DragCardComponent) child: DragCardComponent;
  constructor(
    private cardsHttpService: CardsService,
    private columnsHttpService: ColumnsService,
    private createHistoryService: CreateHistory,
    private searchService: SearchService
  ) {}

  Subscription;

  ngOnInit(): void {
    this.Subscription = this.searchService.searchText.subscribe((text) => {
      if (text == '') {
        console.log('empty');
        this.columnView = true;
      } else this.searchCards(this.column.id, text);
    });
  }

  searchCards(columnId: number, text: string) {
    this.cardsHttpService.searchCards(columnId, text).subscribe(
      (response) => {
        if (response.length == 0) {
          this.columnView = false;
        } else {
          this.columnView = true;
        }
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
        sortBy: this.cardsCount,
      };
      this.cardsHttpService.createCard(this.newCard).subscribe(
        (response) => {
          this.createHistoryService.createHistory(
            UserActions['Created card'],
            this.newCard.title,
            null,
            null
          );
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
    if (
      this.newColumnTitle != '' &&
      this.newColumnTitle !== this.column.title
    ) {
      this.newColumn = {
        id: this.column.id,
        title: this.newColumnTitle,
        boardId: this.column.boardId,
        sortBy: this.column.sortBy,
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
    } else if (this.newColumnTitle === this.column.title) {
      this.editColumn = false;
    }
  }

  getCardsCount(count: number) {
    this.cardsCount = count;
  }

  columnUpdate() {
    this.newColumnTitle = this.column.title;
    this.editColumn = true;
  }

  getNewCardTitle(event: any) {
    this.newCardTitle = event.target.value;
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column: IColumn;
}
