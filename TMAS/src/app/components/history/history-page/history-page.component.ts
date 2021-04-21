import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { IHistory } from 'src/app/interfaces/history.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  constructor(
    private historyHttpSrvice: HistoryService,
    private router: ActivatedRoute
  ) {}
  histories: IHistory[] = [];
  boardId: number;
  ngOnInit(): void {
    this.boardId = Number(this.router.snapshot.params.id);
    this.getAll();
  }

  getAll() {
    this.historyHttpSrvice.getHistory(this.boardId).subscribe(
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
