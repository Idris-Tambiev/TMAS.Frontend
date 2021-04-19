import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ICard } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';
import { CreateHistory } from 'src/app/services/create-history.service';
import { SearchService } from 'src/app/services/search.service';
import { ColumnsPageComponent } from 'src/app/components/column/columns-page/columns-page.component';
import { OpenCardServiceService } from 'src/app/services/open-card-service.service';

@Component({
  selector: 'app-drag-card',
  templateUrl: './drag-card.component.html',
  styleUrls: ['./drag-card.component.scss'],
})
export class DragCardComponent implements OnInit {
  cards: ICard[] = [];
  subscription;

  constructor(
    private cardsHttpService: CardsService,
    private createHistoryService: CreateHistory,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription = this.searchService.searchText.subscribe((text) => {
      if (text == '') this.getAll();
      else this.searchCards(this.column.id, text);
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

      var movedCard: ICard = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      if (event.previousIndex !== event.currentIndex)
        this.moveCard(movedCard, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var card: ICard = JSON.parse(
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
      (response) => {
        this.createHistoryService.createHistory(
          3,
          movedCard.title,
          null,
          movedCard.columnId
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  moveCardColumn(movedCard, oldColumn) {
    this.cardsHttpService.moveCardOnOtherColumn(movedCard).subscribe(
      (response) => {
        this.createHistoryService.createHistory(
          4,
          movedCard.title,
          movedCard.columnId,
          oldColumn
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @Output() cardsCount = new EventEmitter<number>();
  @Input() column;
}