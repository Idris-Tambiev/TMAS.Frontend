import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  closeHistoryField() {
    this.closeField.emit();
  }
  @Output() closeField = new EventEmitter<number>();
}
