import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBoardAccess } from '../interfaces/board-access.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardAccessService {
  configUrl: string = environment.Url;
  constructor(private http: HttpClient) {}

  create(boardAccess: IBoardAccess): Observable<any> {
    return this.http.post(this.configUrl + '/api/access/create', boardAccess);
  }

  getBoards(): Observable<any> {
    return this.http.get(this.configUrl + '/api/access/get');
  }

  getAllUsers(boardId: number, name: string): Observable<any> {
    const params = new HttpParams()
      .set('id', boardId.toString())
      .set('text', name);
    return this.http.get(this.configUrl + '/api/access/get/all/users', {
      params,
    });
  }

  getAssignedUsers(boardId: number, name: string): Observable<any> {
    const params = new HttpParams()
      .set('id', boardId.toString())
      .set('text', name);
    return this.http.get(this.configUrl + '/api/access/get/assigned/users', {
      params,
    });
  }

  deleteAccess(access: IBoardAccess): Observable<any> {
    const params = new HttpParams()
      .set('boardid', access.boardId.toString())
      .set('userId', access.userId);
    return this.http.delete(this.configUrl + '/api/access/delete', { params });
  }
}
