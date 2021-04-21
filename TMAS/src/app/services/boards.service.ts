import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  configUrl: string = environment.Url;
  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<any> {
    return this.http.get(this.configUrl + '/api/boards/get');
  }
  getOneBoard(boardId: number): Observable<any> {
    const params = new HttpParams().set('id', boardId.toString());
    return this.http.get(this.configUrl + '/api/boards/get/one', { params });
  }

  createBoard(title: string): Observable<any> {
    const params = new HttpParams().set('title', title);
    return this.http.get(this.configUrl + '/api/boards/create', {
      params,
    });
  }

  searchBoards(text: string): Observable<any> {
    const params = new HttpParams().set('text', text);
    return this.http.get(this.configUrl + '/api/boards/search', {
      params,
    });
  }
}
