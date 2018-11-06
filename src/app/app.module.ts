import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { reducers, metaReducers } from './_store/reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditorComponent } from './new-project-page/editor/editor.component';
import { ProjectMenuComponent } from './new-project-page/project-menu/project-menu.component';
import { EditorDirective } from './new-project-page/editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectPageComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    ProjectMenuComponent,
    EditorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
