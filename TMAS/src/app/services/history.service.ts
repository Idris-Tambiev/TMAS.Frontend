import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHistory } from '../interfaces/history.interface';
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private httpClient: HttpClient) {}
  configUrl: string = environment.Url;

  getHistory(boardId): Observable<any> {
    const params = new HttpParams().set('id', boardId.toString());
    return this.httpClient.get(this.configUrl + '/api/history/get', { params });
  }

  createHistory(history: IHistory): Observable<any> {
    return this.httpClient.post(
      this.configUrl + '/api/history/create',
      history
    );
  }
}
