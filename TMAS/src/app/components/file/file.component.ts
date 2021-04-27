import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFile } from 'src/app/interfaces/file.interface';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public createPath = (fileName: string) => {
    return `https://localhost:44324/Files/${fileName}`;
  };

  @Input() file: IFile;
}
