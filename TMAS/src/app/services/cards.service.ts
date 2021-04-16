import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICard } from 'src/app/interfaces/card.interface';

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

  getOneCard(cardId: number): Observable<any> {
    const params = new HttpParams().set('id', cardId.toString());
    return this.httpClient.get(this.configUrl + '/api/cards/get/one', {
      params,
    });
  }
  searchCards(columnId: number, text: string): Observable<any> {
    const params = new HttpParams()
      .set('columnId', columnId.toString())
      .set('text', text);
    return this.httpClient.get(this.configUrl + '/api/cards/search', {
      params,
    });
  }
  deleteCard(cardId: number): Observable<any> {
    const params = new HttpParams().set('id', cardId.toString());
    return this.httpClient.delete(this.configUrl + '/api/cards/delete', {
      params,
    });
  }

  createCard(card: ICard): Observable<any> {
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

  updateCardChanges(card: ICard): Observable<any> {
    return this.httpClient.put(
      this.configUrl + '/api/cards/update/changes',
      card
    );
  }

  moveCardPosition(card: ICard): Observable<any> {
    console.log(card);
    return this.httpClient.put(this.configUrl + '/api/cards/move', card);
  }

  moveCardOnOtherColumn(card: ICard): Observable<any> {
    return this.httpClient.put(
      this.configUrl + '/api/cards/moveoncolumn',
      card
    );
  }
}
