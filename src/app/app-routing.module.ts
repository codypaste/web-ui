import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';

const routes: Routes = [
  {path: 'new', component: NewProjectPageComponent},
  { path: '', redirectTo: '/new', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
