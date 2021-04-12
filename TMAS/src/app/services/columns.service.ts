import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IColumn } from 'src/app/interfaces/column.interface';

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

  deleteColumn(columnId: number): Observable<any> {
    const params = new HttpParams().set('id', columnId.toString());
    return this.httpClient.delete(this.configUrl + '/api/columns/delete', {
      params,
    });
  }

  moveColumnPosition(column: IColumn): Observable<any> {
    return this.httpClient.put(this.configUrl + '/api/columns/move', column);
  }

  updateColumn(column: IColumn): Observable<any> {
    return this.httpClient.put(this.configUrl + '/api/columns/update', column);
  }

  createColumn(column: IColumn): Observable<any> {
    return this.httpClient.post(this.configUrl + '/api/columns/create', column);
  }

  getOneColumn(columnId: number): Observable<any> {
    const params = new HttpParams().set('id', columnId.toString());
    return this.httpClient.get(this.configUrl + '/api/columns/get/one', {
      params,
    });
  }
}
