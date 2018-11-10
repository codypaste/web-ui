import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { reducers, metaReducers } from 'src/app/_store/reducers';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { NewProjectPageComponent } from 'src/app/new-project-page/new-project-page.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { EditorComponent } from 'src/app/new-project-page/editor/editor.component';
import { ProjectMenuComponent } from 'src/app/new-project-page/project-menu/project-menu.component';
import { EditorDirective } from 'src/app/new-project-page/editor/editor.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { SelectDirective } from 'src/app/new-project-page/editor-menu/select.directive';
import { EditorMenuComponent } from 'src/app/new-project-page/editor-menu/editor-menu.component';
import { EditorTabsComponent } from 'src/app/new-project-page/editor-tabs/editor-tabs.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { EditorViewTabsComponent } from './view-page/editor-view-tabs/editor-view-tabs.component';
import { ProjectInfoComponent } from './view-page/project-info/project-info.component';
import { ShareComponent } from './view-page/share/share.component';
import { ViewEditorComponent } from './view-page/view-editor/view-editor.component';
import { ViewEditorDirective } from './view-page/view-editor/view-editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectPageComponent,
    FooterComponent,
    EditorComponent,
    ProjectMenuComponent,
    EditorDirective,
    SelectDirective,
    EditorMenuComponent,
    EditorTabsComponent,
    ViewPageComponent,
    EditorViewTabsComponent,
    ProjectInfoComponent,
    ShareComponent,
    ViewEditorComponent,
    ViewEditorDirective
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
