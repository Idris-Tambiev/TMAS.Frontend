import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/interfaces/new-history.interface';
export class CreateHistory {
  constructor(private historyHttpService: HistoryService) {}
  createHistory(action: number, actionObject: string, dest: number, source) {
    const history: History = {
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
