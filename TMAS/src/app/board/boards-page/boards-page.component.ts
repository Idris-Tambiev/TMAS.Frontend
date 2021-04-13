import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { IBoard } from 'src/app/interfaces/board.interface';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boards: IBoard[] = [];
  newBoardTitle: string;
  insertFormStatus: boolean = false;
  subscription;

  constructor(
    private httpService: BoardsService,
    private search: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription = this.search.searchText.subscribe((text) => {
      if (text == '') this.getAll();
      else this.searchBoards(text);
    });
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
