import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardsService } from '../services/cards.service';
import { ColumnsService } from '../services/columns.service';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  insertFormStatus: boolean = false;
  constructor(
    private cardsHttpService: CardsService,
    private columnsHttpService: ColumnsService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
  cards = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
  openInsertField() {
    this.insertFormStatus = true;
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

  clickOnCancelButton() {
    this.insertFormStatus = false;
  }
  getNewCardText(event: any) {}

  @Output() updateColumnsList = new EventEmitter<number>();
  @Input() column;
}
