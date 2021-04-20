import { HttpClient } from '@angular/common/http';
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
}
