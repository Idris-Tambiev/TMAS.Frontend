import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from 'src/app/services/columns.service';
@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.css'],
})
export class ColumnsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: ColumnsService) {}
  boardId: number;
  columns = [];
  ngOnInit(): void {
    this.getBoardId();
    this.getAllColumns();
  }
  getBoardId() {
    const routeParams = this.route.snapshot.paramMap;
    this.boardId = Number(routeParams.get('id'));
  }

  getAllColumns() {
    this.http.getAllColumns(this.boardId).subscribe(
      (response) => {
        this.columns = response;
      },
      (error) => console.log(error)
    );
  }
}
