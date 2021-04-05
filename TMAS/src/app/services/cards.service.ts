import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from 'src/app/interfaces/card.interface';
import { NewCard } from 'src/app/interfaces/new.card.interface';
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

  createCard(card: NewCard): Observable<any> {
    return this.httpClient.post(this.configUrl + '/api/cards/create', card);
  }

  cardCheck(cardId: number, cardStatus: boolean): Observable<any> {
    const params = new HttpParams()
      .set('id', cardId.toString())
      .set('isDone', cardStatus.toString());
    return this.httpClient.get(this.configUrl + '/api/cards/update/check', {
      params,
    });
  }

  updateCardTitle(card: object): Observable<any> {
    return this.httpClient.put(this.configUrl + '/api/cards/update', card);
  }
}
