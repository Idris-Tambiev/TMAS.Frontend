import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/interfaces/history.interface';
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  constructor(private historyHttpSrvice: HistoryService) {}
  histories: History[] = [];
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.historyHttpSrvice.getHistory().subscribe(
      (response) => {
        this.histories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  closeHistoryField() {
    this.closeField.emit();
  }
  @Output() closeField = new EventEmitter<number>();
}
