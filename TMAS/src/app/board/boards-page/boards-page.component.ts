import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { IBoard } from 'src/app/interfaces/board.interface';
@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  constructor(private httpService: BoardsService) {}
  boards: IBoard[] = [];
  newBoardTitle: string;
  insertFormStatus: boolean = false;
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.httpService.getAllBoards().subscribe(
      (respone) => {
        this.boards = respone;
        console.log(respone);
      },
      (error) => console.log(error)
    );
  }
  getBoardTitle(event: any) {
    if (event.target.value != '') {
      this.newBoardTitle = event.target.value;
      console.log(event.target.value);
    }
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
}
