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
import { DragCardComponent } from 'src/app/components/card/cards-drag/drag-card.component';
import { IColumn } from 'src/app/interfaces/column.interface';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { from } from 'rxjs';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit {
  insertFormStatus: boolean = false;
  newCardTitle: string;
  newCard: ICard;
  editColumn: boolean = false;
  newColumnTitle: string;
  newColumn: IColumn;
  history: History;
  columnView: boolean = true;
  cardsCount: number;
  Subscription;
  boardId: number;
  @ViewChild(DragCardComponent) child: DragCardComponent;
  constructor(
    private cardsHttpService: CardsService,
    private columnsHttpService: ColumnsService,
    private searchService: BehaviorSubjectService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.boardId = Number(routeParams.get('id'));
    this.Subscription = this.searchService.searchText.subscribe((text) => {
      if (text == '') {
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
      },
      (error) => console.log(error)
    );
  }

  createNewCard() {
    console.log(this.newCardTitle);
    if (this.newCardTitle !== '' && this.newCardTitle != null) {
      this.newCard = {
        title: this.newCardTitle,
        columnId: this.column.id,
        sortBy: this.cardsCount,
      };
      this.cardsHttpService.createCard(this.newCard).subscribe(
        (response) => {
          this.newCardTitle = '';
          this.child.getAll();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  submitNewColumnTitle() {
    if (
      this.newColumnTitle != '' &&
      this.newColumnTitle !== this.column.title
    ) {
      this.columnsHttpService
        .updateColumn(this.column.id, this.newColumnTitle)
        .subscribe(
          (response) => {
            this.updateColumnsList.emit();
            this.editColumn = false;
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

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
  click() {
    console.log('Clicked');
  }

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column: IColumn;
}
