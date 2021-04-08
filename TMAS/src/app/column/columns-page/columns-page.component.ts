import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from 'src/app/services/columns.service';
import { Column } from 'src/app/interfaces/column.interface';
import { DragColumnComponent } from 'src/app/column/drag-column/drag-column.component';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { History } from 'src/app/interfaces/new-history.interface';
import { HistoryService } from 'src/app/services/history.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
})
export class ColumnsPageComponent implements OnInit {
  insertFormStatus: boolean = false;
  columnNewTitle: string;
  newColumn: Column;
  boardId: number;
  columns: Column[] = [];
  viewHistory: boolean = false;
  history: History;
  constructor(
    private route: ActivatedRoute,
    private httpService: ColumnsService,
    private historyHttpService: HistoryService
  ) {}
  @ViewChild(DragColumnComponent) child: DragColumnComponent;

  ngOnInit(): void {
    console.log(UserActions[0]);
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

  createNewColumn() {
    if (this.columnNewTitle != '') {
      this.newColumn = {
        Id: 0,
        BoardId: this.boardId,
        Title: this.columnNewTitle,
        SortBy: this.columns.length,
      };
      this.httpService.createColumn(this.newColumn).subscribe(
        (response) => {
          console.log(response);
          this.insertFormStatus = false;
          this.createHistory(
            UserActions['Created column'],
            this.newColumn.Title,
            null,
            null
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

  getNewColumnTitle(event: any) {
    this.columnNewTitle = event.target.value;
  }

  createHistory(action: number, actionObject: string, dest: number, source) {
    this.history = {
      ActionType: action,
      ActionObject: actionObject,
      DestinationAction: dest,
      SourceAction: source,
    };
    this.historyHttpService.createHistory(this.history).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
