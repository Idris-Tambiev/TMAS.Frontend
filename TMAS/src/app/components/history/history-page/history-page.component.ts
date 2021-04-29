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
  @Output() closeField = new EventEmitter<number>();

  histories: IHistory[] = [];
  skipCount: number = 0;
  boardId: number;
  scrollEnd = false;

  constructor(
    private historyHttpSrvice: HistoryService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.router.snapshot.params.id);
    this.getAll();
  }

  getAll() {
    this.historyHttpSrvice.getHistory(this.boardId, 0).subscribe(
      (response) => {
        this.histories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  scroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.scrollEnd = true;
    } else {
      this.scrollEnd = false;
    }
  }

  showNextHistory() {
    this.skipCount++;
    this.historyHttpSrvice.getHistory(this.boardId, this.skipCount).subscribe(
      (response) => {
        this.histories.push.apply(this.histories, response);
        this.scrollEnd = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  closeHistoryField() {
    this.closeField.emit();
  }
}
