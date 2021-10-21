import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { ICard } from 'src/app/interfaces/card.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardPageComponent } from '../card-page/card-page.component';

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
    // private openCardService: OpenCardService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.boardId = this.router.snapshot.params.id;
  }

  deleteThisCard() {
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
    this.dialog.open(CardPageComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        id: this.card.id,
      },
    });
  }
}
