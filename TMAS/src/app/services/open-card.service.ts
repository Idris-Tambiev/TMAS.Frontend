import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenCardService {
  card: ICard;
  constructor() {}

  setCard(sendedCard: ICard) {
    this.card = sendedCard;
  }
  close() {
    this.card = null;
  }
}
