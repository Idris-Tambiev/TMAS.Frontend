import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from 'src/app/services/columns.service';
import { IColumn } from 'src/app/interfaces/column.interface';
import { DragColumnComponent } from 'src/app/components/column/drag-column/drag-column.component';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { CreateHistory } from 'src/app/services/create-history.service';
import { from } from 'rxjs';
import { OpenCardServiceService } from 'src/app/services/open-card-service.service';
import { ICard } from 'src/app/interfaces/card.interface';
@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
})
export class ColumnsPageComponent implements OnInit {
  insertFormStatus: boolean = false;
  columnNewTitle: string;
  newColumn: IColumn;
  boardId: number;
  columns: IColumn[] = [];
  viewHistory: boolean = false;
  history: History;
  viewCard: boolean = false;
  columnTitle: string;
  currentColumn: IColumn;
  card: ICard;
  constructor(
    private route: ActivatedRoute,
    private httpService: ColumnsService,
    private createHistoryService: CreateHistory,
    private openCardService: OpenCardServiceService
  ) {}

  @ViewChild(DragColumnComponent) child: DragColumnComponent;

  ngOnInit(): void {
    this.getBoardId();
    this.getAllColumns();
  }
  getBoardId() {
    const routeParams = this.route.snapshot.paramMap;
    this.boardId = Number(routeParams.get('id'));
  }

  getAllColumns() {
    this.httpService.getAllColumns(this.boardId).subscribe(
      (response) => {
        this.columns = response;
      },
      (error) => console.log(error)
    );
  }

  openCardWindow(card) {
    console.log(card);
    this.viewCard = true;
  }

  createNewColumn() {
    if (this.columnNewTitle != '') {
      this.newColumn = {
        boardId: this.boardId,
        title: this.columnNewTitle,
        sortBy: this.columns.length,
      };
      this.httpService.createColumn(this.newColumn).subscribe(
        (response) => {
          this.insertFormStatus = false;

          this.createHistoryService.createHistory(
            UserActions['Created column'],
            this.newColumn.title,
            null,
            null,
            this.boardId
          );

          this.child.getAll();
          this.getAllColumns();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngDoCheck() {
    this.card = this.openCardService.card;
    if (this.card != null) {
      this.viewCard = true;
      this.currentColumn = this.columns.find((x) => x.id == this.card.columnId);
      this.columnTitle = this.currentColumn.title;
    } else {
      this.viewCard = false;
    }
  }
}
