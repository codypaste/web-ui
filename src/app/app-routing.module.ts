import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'new', component: NewProjectPageComponent },
  { path: 'view/:id', component: ViewPageComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
