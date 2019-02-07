import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EncryptionErrorPageComponent } from './encryption-error-page/encryption-error-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  { path: 'new', component: NewProjectPageComponent },
  { path: 'view/:id', component: ViewPageComponent},
  { path: 'edit/:id', component: EditPageComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'encryption-error', component: EncryptionErrorPageComponent },
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
