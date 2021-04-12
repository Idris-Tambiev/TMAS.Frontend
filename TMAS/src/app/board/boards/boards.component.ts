import { Component, Input, OnInit } from '@angular/core';
import { IBoard } from 'src/app/interfaces/board.interface';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    var retrievedObject = JSON.parse(localStorage.getItem('userToken'));
    console.log('mytoken: ', retrievedObject.access_token);
  }
  @Input() board: IBoard;
}
