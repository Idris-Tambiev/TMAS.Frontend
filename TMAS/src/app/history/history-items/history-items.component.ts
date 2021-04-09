import { Component, Input, OnInit } from '@angular/core';
import { History } from 'src/app/interfaces/history.interface';
import { UserActions } from 'src/app/enums/user-actions.enum';
import { UserService } from 'src/app/services/user.service';
import { UserName } from 'src/app/interfaces/user.name.interface';
import { ColumnsService } from 'src/app/services/columns.service';
import { Column } from 'src/app/interfaces/column.interface';
import { from } from 'rxjs';
@Component({
  selector: 'app-history-items',
  templateUrl: './history-items.component.html',
  styleUrls: ['./history-items.component.scss'],
})
export class HistoryItemsComponent implements OnInit {
  action: string;
  user: UserName = { name: '', lastName: '' };
  source: Column = { id: 0, sortBy: 0, title: '', boardId: 0 };
  dest: Column = { id: 0, sortBy: 0, title: '', boardId: 0 };
  movedOtherColumn: boolean;
  constructor(
    private userService: UserService,
    private columnsHttpService: ColumnsService
  ) {}

  ngOnInit(): void {
    this.action = UserActions[this.history.actionType];

    this.userService.getUserName().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.history.actionType == 4) {
      this.movedOtherColumn = true;
      this.getColumnsName();
    } else {
      this.movedOtherColumn = false;
    }
  }

  getColumnsName() {
    this.columnsHttpService.getOneColumn(this.history.sourceAction).subscribe(
      (response) => {
        this.source = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.columnsHttpService
      .getOneColumn(this.history.destinationAction)
      .subscribe(
        (response) => {
          this.dest = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  @Input() history: History;
}
