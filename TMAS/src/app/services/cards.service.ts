import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private httpClient: HttpClient) {}
  configUrl: string = environment.Url;

  getAllCards(columnId: number): Observable<any> {
    const params = new HttpParams().set('id', columnId.toString());
    return this.httpClient.get(this.configUrl + '/api/cards/get', { params });
  }
  deleteCard(cardId: number): Observable<any> {
    const params = new HttpParams().set('id', cardId.toString());
    return this.httpClient.delete(this.configUrl + '/api/cards/delete', {
      params,
    });
  }
}
