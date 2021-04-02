import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardsService } from '../services/cards.service';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  constructor(private httpService: CardsService) {}

  ngOnInit(): void {
    this.getAll();
  }
  cards = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  getAll() {
    this.httpService.getAllCards(this.column.id).subscribe(
      (response) => {
        this.cards = response;
      },
      (error) => console.log(error)
    );
  }
  deleteThisColumn() {
    this.deleteColumn.emit(this.column.id);
  }
  deleteThisCard(id: number) {
    this.httpService.deleteCard(id).subscribe(
      (response) => {
        this.getAll();
      },
      (error) => console.log(error)
    );
  }

  @Output() deleteColumn = new EventEmitter<number>();
  @Input() column;
}
