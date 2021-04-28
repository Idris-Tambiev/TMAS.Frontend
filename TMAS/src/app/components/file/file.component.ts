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

  getFile() {
    console.log(this.file.fileUrl);
    return this.file.fileUrl;
  }

  @Input() file: IFile;
}
