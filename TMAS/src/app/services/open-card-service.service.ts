import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenCardServiceService {
  card: ICard;
  constructor() {}

  getCard(sendedCard: ICard) {
    this.card = sendedCard;
  }
}
