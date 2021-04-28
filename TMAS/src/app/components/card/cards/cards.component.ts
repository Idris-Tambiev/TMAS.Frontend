import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { ICard } from 'src/app/interfaces/card.interface';
import { OpenCardServiceService } from 'src/app/services/open-card-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  editCard = false;
  newTitle: string;
  history: History;
  boardId: number;
  constructor(
    private httpService: CardsService,
    private openCardService: OpenCardServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.boardId = Number(routeParams.get('id'));
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
    console.log(status);
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
    this.openCardService.getCard(this.card);
  }

  @Output() updateCardsList = new EventEmitter<number>();
  @Output() emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  @Input() card: ICard;
}
