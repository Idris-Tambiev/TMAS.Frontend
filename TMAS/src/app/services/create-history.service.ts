import { HistoryService } from 'src/app/services/history.service';
import { IHistory } from 'src/app/interfaces/history.interface';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CreateHistory {
  constructor(private historyHttpService: HistoryService) {}

  createHistory(
    action: number,
    actionObject: string,
    dest: number,
    source: number,
    boardId: number
  ) {
    var history: IHistory = {
      actionType: action,
      actionObject: actionObject,
      destinationAction: dest,
      sourceAction: source,
      boardId: boardId,
    };

    this.historyHttpService.createHistory(history).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
