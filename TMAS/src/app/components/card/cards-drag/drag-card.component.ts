import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drag-card',
  templateUrl: './drag-card.component.html',
  styleUrls: ['./drag-card.component.scss'],
})
export class DragCardComponent implements OnInit {
  @Input() column;
  @Output() cardsCount = new EventEmitter<number>();

  cards: ICard[] = [];
  subscription;
  boardId: number;
  constructor(
    private cardsHttpService: CardsService,
    private searchService: BehaviorSubjectService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.boardId = this.router.snapshot.params.id;
    this.subscription = this.searchService.searchText.subscribe((text) => {
      if (text == '') {
        this.getAll();
      } else {
        this.searchCards(this.column.id, text);
      }
    });
  }

  searchCards(columnId: number, text: string) {
    this.cardsHttpService.searchCards(columnId, text).subscribe(
      (response) => {
        this.cards = response;
      },
      (error) => console.log(error)
    );
  }

  getAll() {
    this.cardsHttpService.getAllCards(this.column.id).subscribe(
      (response) => {
        this.cards = response;
        this.cardsCount.emit(this.cards.length);
      },
      (error) => console.log(error)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex);

      const movedCard: ICard = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );

      if (event.previousIndex !== event.currentIndex) {
        this.moveCard(movedCard, event.currentIndex);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let card: ICard = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      const oldColumn = card.columnId;
      card.columnId = parseInt(event.container.element.nativeElement.id);
      card.sortBy = event.currentIndex;
      this.moveCardColumn(card, oldColumn);
    }
  }

  moveCard(movedCard, position: number) {
    movedCard.sortBy = position;
    this.cardsHttpService.moveCardPosition(movedCard).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  moveCardColumn(movedCard, oldColumn) {
    this.cardsHttpService.moveCardOnOtherColumn(movedCard).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
