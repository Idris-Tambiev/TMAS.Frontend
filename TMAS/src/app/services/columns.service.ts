import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private httpClient: HttpClient) {}
  configUrl: string = environment.Url;
  getAllColumns(boardId: number): Observable<any> {
    const params = new HttpParams().set('id', boardId.toString());
    return this.httpClient.get(this.configUrl + '/api/columns/get', { params });
  }
}
