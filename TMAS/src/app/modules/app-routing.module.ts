import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from '../components/auth/auth-page/auth-page.component';
import { BoardsPageComponent } from '../components/board/boards-page/boards-page.component';
import { ColumnsPageComponent } from '../components/column/columns-page/columns-page.component';
import { EmailConfirmComponent } from '../components/auth/email-confirm/email-confirm.component';

const appRoutes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: AuthPageComponent },
  { path: 'boards', component: BoardsPageComponent },
  { path: 'board/:id', component: ColumnsPageComponent },
  {
    path: 'confirmemail/:userid/:token',
    component: EmailConfirmComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
