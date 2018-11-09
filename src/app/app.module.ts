import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { reducers, metaReducers } from './_store/reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditorComponent } from './new-project-page/editor/editor.component';
import { ProjectMenuComponent } from './new-project-page/project-menu/project-menu.component';
import { EditorDirective } from './new-project-page/editor/editor.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SelectDirective } from './new-project-page/editor-menu/select.directive';
import { EditorMenuComponent } from './new-project-page/editor-menu/editor-menu.component';
import { EditorTabsComponent } from './new-project-page/editor-tabs/editor-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectPageComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    ProjectMenuComponent,
    EditorDirective,
    SelectDirective,
    EditorMenuComponent,
    EditorTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
