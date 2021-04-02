import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private httpClient: HttpClient) {}
  configUrl: string = environment.Url;
  getAllCards(): Observable<any> {
    return this.httpClient.get(this.configUrl + '/api/history/get');
  }
}
