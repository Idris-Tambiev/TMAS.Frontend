import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from 'src/app/services/columns.service';
import { Column } from 'src/app/interfaces/column.interface';

@Component({
  selector: 'app-drag-column',
  templateUrl: './drag-column.component.html',
  styleUrls: ['./drag-column.component.scss'],
})
export class DragColumnComponent implements OnInit {
  constructor(private columnsHttpService: ColumnsService) {}
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
      this.moveColumn(movedColumn, event.currentIndex);
    }
  }

  moveColumn(movedColumn, position: number) {
    movedColumn.sortBy = position;
    this.columnsHttpService.moveColumnPosition(movedColumn).subscribe(
      (response) => {
        //this.getAll();
        console.log(movedColumn);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @Input() boardId;
}
