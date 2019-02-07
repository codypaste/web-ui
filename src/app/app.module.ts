import { BrowserModule, Title } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EditorComponent } from 'src/app/new-project-page/editor/editor.component';
import { EditorDirective } from 'src/app/new-project-page/editor/editor.directive';
import { EditorMenuComponent } from 'src/app/new-project-page/editor-menu/editor-menu.component';
import { EditorTabsComponent } from 'src/app/new-project-page/editor-tabs/editor-tabs.component';
import { EditorViewTabsComponent } from 'src/app/view-page/editor-view-tabs/editor-view-tabs.component';
import { environment } from 'src/environments/environment';
import { FooterComponent } from 'src/app/footer/footer.component';
import { NewProjectPageComponent } from 'src/app/new-project-page/new-project-page.component';
import { ProjectInfoComponent } from 'src/app/view-page/project-info/project-info.component';
import { ProjectMenuComponent } from 'src/app/new-project-page/project-menu/project-menu.component';
import { reducers, metaReducers } from 'src/app/_store/reducers';
import { SelectDirective } from 'src/app/new-project-page/editor-menu/select.directive';
import { ShareComponent } from 'src/app/view-page/share/share.component';
import { ViewEditorComponent } from 'src/app/view-page/view-editor/view-editor.component';
import { ViewEditorDirective } from 'src/app/view-page/view-editor/view-editor.directive';
import { ViewPageComponent } from 'src/app/view-page/view-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AutofocusDirective } from './autofocus.directive';
import { EncryptionErrorPageComponent } from './encryption-error-page/encryption-error-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

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
    ViewEditorDirective,
    NotFoundComponent,
    AutofocusDirective,
    EncryptionErrorPageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ClipboardModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
