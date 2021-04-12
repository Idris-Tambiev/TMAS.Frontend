import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ColumnsPageComponent } from './column/columns-page/columns-page.component';
import { ColumnsComponent } from './column/columns/columns.component';
import { CardsComponent } from './card/cards/cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsPageComponent } from './board/boards-page/boards-page.component';
import { BoardsComponent } from './board/boards/boards.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { ParamInterceptor } from 'src/app/Interceptor/interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { DragCardComponent } from './card/cards-drag/drag-card.component';
import { DragColumnComponent } from './column/drag-column/drag-column.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { HistoryPageComponent } from './history/history-page/history-page.component';
import { HistoryItemsComponent } from './history/history-items/history-items.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: AuthPageComponent },
  { path: 'boards', component: BoardsPageComponent },
  { path: 'board/:id', component: ColumnsPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ColumnsPageComponent,
    ColumnsComponent,
    CardsComponent,
    BoardsPageComponent,
    BoardsComponent,
    AuthorizationComponent,
    HeaderComponent,
    DragCardComponent,
    DragColumnComponent,
    RegistrationComponent,
    AuthPageComponent,
    HistoryPageComponent,
    HistoryItemsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    StorageServiceModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    DragDropModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
