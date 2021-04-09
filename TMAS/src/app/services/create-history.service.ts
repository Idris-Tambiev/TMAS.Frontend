import { HistoryService } from 'src/app/services/history.service';
import { NewHistory } from 'src/app/interfaces/new-history.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateHistory {
  constructor(private historyHttpService: HistoryService) {}

  createHistory(
    action: number,
    actionObject: string,
    dest: number,
    source: number
  ) {
    var history: NewHistory = {
      ActionType: action,
      ActionObject: actionObject,
      DestinationAction: dest,
      SourceAction: source,
    };

    this.historyHttpService.createHistory(history).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
