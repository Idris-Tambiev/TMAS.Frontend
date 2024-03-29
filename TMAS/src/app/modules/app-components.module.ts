import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ColumnsComponent } from '../components/column/columns/columns.component';
import { BoardsPageComponent } from '../components/board/boards-page/boards-page.component';
import { BoardsComponent } from '../components/board/boards/boards.component';
import { AuthorizationComponent } from '../components/auth/authorization/authorization.component';
import { HeaderComponent } from '../components/header/header.component';
import { DragCardComponent } from '../components/card/cards-drag/drag-card.component';
import { DragColumnComponent } from '../components/column/drag-column/drag-column.component';
import { RegistrationComponent } from '../components/auth/registration/registration.component';
import { AuthPageComponent } from '../components/auth/auth-page/auth-page.component';
import { HistoryPageComponent } from '../components/history/history-page/history-page.component';
import { HistoryItemsComponent } from '../components/history/history-items/history-items.component';
import { CardsComponent } from '../components/card/cards/cards.component';
import { ColumnsPageComponent } from '../components/column/columns-page/columns-page.component';
import { CardPageComponent } from '../components/card/card-page/card-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatComponentsModule } from './mat-components.module';
import { EmailConfirmComponent } from 'src/app/components/auth/email-confirm/email-confirm.component';
import { FileComponent } from 'src/app/components/file/file.component';
import { UserMenuComponent } from 'src/app/components/user-menu/user-menu.component';
import { PasswordResetPageComponent } from '../components/password/password-reset-page/password-reset-page.component';
import { NewPasswordPageComponent } from '../components/password/new-password-page/new-password-page.component';

@NgModule({
  declarations: [
    UserMenuComponent,
    FileComponent,
    CardPageComponent,
    ColumnsComponent,
    ColumnsPageComponent,
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
    EmailConfirmComponent,
    PasswordResetPageComponent,
    NewPasswordPageComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ColumnsComponent,
    ColumnsPageComponent,
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
    EmailConfirmComponent,
    PasswordResetPageComponent,
    NewPasswordPageComponent,
  ],
})
export class AppComponentsModule {}
