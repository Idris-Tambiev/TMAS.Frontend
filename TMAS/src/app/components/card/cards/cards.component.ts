import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { ICard } from 'src/app/interfaces/card.interface';
import { OpenCardService } from 'src/app/services/open-card.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() card: ICard;
  @Output() updateCardsList = new EventEmitter<number>();
  @Output() emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();

  editCard = false;
  newTitle: string;
  history: History;
  boardId: number;
  constructor(
    private httpService: CardsService,
    private openCardService: OpenCardService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.boardId = this.router.snapshot.params.id;
  }

  deleteThisCard() {
    const deletedCardName = this.card.title;
    this.httpService.deleteCard(this.card.id).subscribe(
      (response) => {
        this.updateCardsArray();
      },
      (error) => console.log(error)
    );
  }

  updateCardsArray() {
    this.updateCardsList.emit();
  }

  checkCard(event: any) {
    const status = event.target.checked;
    this.httpService.cardCheck(this.card.id, status).subscribe(
      (response) => {
        this.updateCardsArray();
      },
      (error) => console.log(error)
    );
  }

  updateThisCard() {
    if (this.newTitle !== '' && this.newTitle !== this.card.title) {
      this.httpService.updateCardTitle(this.card.id, this.newTitle).subscribe(
        (response) => {
          this.updateCardsArray();
        },
        (error) => console.log(error)
      );
    }
    this.editCard = false;
  }

  openCardField() {
    this.openCardService.setCard(this.card);
  }
}
