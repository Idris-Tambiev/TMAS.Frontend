import { Component, Input, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    console.log(this.card);
  }

  @Input() card;
}
