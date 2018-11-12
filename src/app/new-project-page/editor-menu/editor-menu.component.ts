import { Component, OnInit } from '@angular/core';
import { getActiveEditor, NewProjectState } from 'src/app/_store/newProjectStore';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { EditorModel } from 'src/app/_models/EditorModel';
import * as fromActions from 'src/app/_store/newProjectActions';

declare var CodeMirror: any;

@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  styleUrls: ['./editor-menu.component.css']
})
export class EditorMenuComponent implements OnInit {

  fileName: string;
  filenameSub: Subscription;
  modes: any[];
  activeEditor$: Observable<EditorModel>;

  constructor(
    private store: Store<NewProjectState>
  ) {
    this.activeEditor$ = this.store.pipe(select(getActiveEditor));
    this.filenameSub = this.activeEditor$.subscribe(editor => {
      this.fileName = editor.title;
    });
    this.modes = CodeMirror.modeInfo.filter(mode => mode.mode !== 'rpm');
  }

  ngOnInit() {
  }

  onFilenameChange() {
    this.store.dispatch(new fromActions.SetTitleForActiveEditorAction(this.fileName));
  }
}
