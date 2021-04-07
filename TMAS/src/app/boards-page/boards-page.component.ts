import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from 'src/app/interfaces/board.interface';
@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  constructor(private httpService: BoardsService) {}
  boards: Board[] = [];
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
}
