import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from 'src/app/services/columns.service';
import { IColumn } from 'src/app/interfaces/column.interface';
import { DragColumnComponent } from 'src/app/components/column/drag-column/drag-column.component';
import { OpenCardService } from 'src/app/services/open-card.service';
import { ICard } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
})
export class ColumnsPageComponent implements OnInit {
  insertFormStatus = false;
  columnNewTitle: string;
  newColumn: IColumn;
  boardId: number;
  columns: IColumn[] = [];
  viewHistory = false;
  history: History;
  viewCard = false;
  columnTitle: string;
  currentColumn: IColumn;
  card: ICard;
  constructor(
    private route: ActivatedRoute,
    private httpService: ColumnsService,
    private openCardService: OpenCardService
  ) {}

  @ViewChild(DragColumnComponent) child: DragColumnComponent;

  ngOnInit(): void {
    this.getBoardId();
    this.getAllColumns();
  }
  getBoardId() {
    this.boardId = this.route.snapshot.params.id;
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
        boardId: this.boardId,
        title: this.columnNewTitle,
        sortBy: this.columns.length,
      };
      this.httpService.createColumn(this.newColumn).subscribe(
        (response) => {
          this.insertFormStatus = false;
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
    if (this.card) {
      this.viewCard = true;
      this.currentColumn = this.columns.find((x) => x.id == this.card.columnId);
      this.columnTitle = this.currentColumn.title;
    } else {
      this.viewCard = false;
    }
  }
}
