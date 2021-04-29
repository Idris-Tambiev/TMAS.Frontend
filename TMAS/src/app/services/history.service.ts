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

  getHistory(boardId: number, skipCount: number): Observable<any> {
    const params = new HttpParams()
      .set('id', boardId.toString())
      .set('skip', skipCount.toString());
    return this.httpClient.get(this.configUrl + '/api/history/get', { params });
  }
}
