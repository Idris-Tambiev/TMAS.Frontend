import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from 'src/app/services/columns.service';
import { Column } from 'src/app/interfaces/column.interface';
import { CreateHistory } from 'src/app/services/create-history.service';
import { UserActions } from 'src/app/enums/user-actions.enum';
@Component({
  selector: 'app-drag-column',
  templateUrl: './drag-column.component.html',
  styleUrls: ['./drag-column.component.scss'],
})
export class DragColumnComponent implements OnInit {
  constructor(
    private columnsHttpService: ColumnsService,
    private createHistoryService: CreateHistory
  ) {}
  columns: Column[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.columnsHttpService.getAllColumns(this.boardId).subscribe(
      (response) => {
        this.columns = response;
      },
      (error) => console.log(error)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

      var movedColumn: Column = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      var moved = event.container.data[event.currentIndex];
      console.log(moved);
      this.moveColumn(moved, event.currentIndex);
    }
  }

  moveColumn(movedColumn, position: number) {
    movedColumn.sortBy = position;
    //console.log(movedColumn);
    //console.log(movedColumn.title);
    this.columnsHttpService.moveColumnPosition(movedColumn).subscribe(
      (response) => {
        this.createHistoryService.createHistory(
          UserActions['Moved column'],
          movedColumn.title,
          null,
          null
        );
        //console.log(movedColumn);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @Input() boardId;
}
