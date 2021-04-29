import { Component, Input, OnInit } from '@angular/core';
import { IBoard } from 'src/app/interfaces/board.interface';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  @Input() board: IBoard;
  constructor() {}

  ngOnInit(): void {
    //this.get();
  }

  get() {
    var retrievedObject = JSON.parse(localStorage.getItem('userToken'));
  }
}
