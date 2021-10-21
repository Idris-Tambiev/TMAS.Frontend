import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { IBoard } from 'src/app/interfaces/board.interface';
import { BehaviorSubjectService } from 'src/app/services/behaviors.service';
import { BoardAccessService } from 'src/app/services/board-access.service';
@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boards: IBoard[] = [];
  assignedBoards: IBoard[] = [];
  assigned = false;
  newBoardTitle: string;
  insertFormStatus = false;
  subscription;

  constructor(
    private httpService: BoardsService,
    private search: BehaviorSubjectService,
    private accessService: BoardAccessService
  ) {}

  ngOnInit(): void {
    this.subscription = this.search.searchText.subscribe((text) => {
      if (text == '') {
        this.getAll();
      } else {
        this.searchBoards(text);
      }
    });

    this.accessService.getBoards().subscribe(
      (response) => {
        this.assignedBoards = response;
        if (this.assignedBoards.length > 0) {
          this.assigned = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAll() {
    this.httpService.getAllBoards().subscribe(
      (respone) => {
        this.boards = respone;
      },
      (error) => console.log(error)
    );
  }

  searchBoards(text: string) {
    this.httpService.searchBoards(text).subscribe(
      (response) => {
        this.boards = response;
      },
      (error) => console.log(error)
    );
  }

  createBoard() {
    if (this.newBoardTitle != null) {
      this.httpService.createBoard(this.newBoardTitle).subscribe(
        (response) => {
          this.getAll();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
