import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
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
  @Input() board;
}
