import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardsService } from '../services/cards.service';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  constructor(private http: CardsService) {}

  ngOnInit(): void {
    this.getAll();
  }
  cards = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  getAll() {
    this.http.getAllCards(this.column.id).subscribe(
      (response) => {
        this.cards = response;
      },
      (error) => console.log(error)
    );
  }
  @Input() column;
}
