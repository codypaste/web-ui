import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NewProjectState, getEditors, getActiveEditor, getNumberOfOpenedEditors} from '../_store/newProjectStore';
import * as fromActions from '../_store/actions';
import { EditorModel } from '../_models/EditorModel';
import {environment} from '../../environments/environment';
import { EncryptionService } from '../_services/encryption.service';

declare var CodeMirror: any;
@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit, OnDestroy {

  editors$: Observable<EditorModel[]>;
  activeEditor$: Observable<EditorModel>;
  numberOfOpenedEditors$: Observable<Number>;
  fileName: string;
  filenameSub: Subscription;
  modes: any[];
  maxEditors: number;

  constructor(
    private store: Store<NewProjectState>
    ) {
    this.editors$ = store.pipe(select(getEditors));
    this.activeEditor$ = store.pipe(select(getActiveEditor));
    this.numberOfOpenedEditors$ = store.pipe(select(getNumberOfOpenedEditors));

    this.filenameSub = this.activeEditor$.subscribe(editor => {
      this.fileName = editor.title;
    });

    this.modes = CodeMirror.modeInfo.filter(mode => mode.mode !== 'rpm');
    this.maxEditors = environment.maxEditors;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.filenameSub.unsubscribe();
  }

  async onAddEditor() {
    this.store.dispatch(new fromActions.AddEditorAction());
  }

  switchActiveEditor(index) {
    this.store.dispatch(new fromActions.SwitchEditorAction(index));
  }

  onCloseEditor(index) {
    const remove = confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromActions.CloseEditorAction(index));
    }
  }

  onFilenameChange() {
    this.store.dispatch(new fromActions.SetTitleForActiveEditorAction(this.fileName));
  }
}
