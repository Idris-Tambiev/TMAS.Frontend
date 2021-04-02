import { HttpClient } from '@angular/common/http';
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
}
