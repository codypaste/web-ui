import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { NewProjectState, getEditors, getActiveEditor } from '../../_store/newProjectStore';
import * as fromAction from '../../_store/actions';
import { EditorModel } from '../../_models/EditorModel';

declare var CodeMirror: any;

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective implements OnDestroy {
  editor: any;
  editors$: Observable<EditorModel[]>;
  activeEditor$: Observable<EditorModel>;

  editorContent: Subscription;

  constructor(el: ElementRef,
    private store: Store<NewProjectState>) {
    CodeMirror.modeURL = 'cm-%N.js';

    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true
    });

    this.editors$ = store.pipe(select(getEditors));
    this.activeEditor$ = store.pipe(select(getActiveEditor));

    this.editorContent = this.activeEditor$.subscribe(editor => {
      this.editor.setValue(editor.content || '');
      const currentMode = this.editor.getOption('mode');
      let newMode = editor.syntax;
      if (!newMode) {
        newMode = 'Plain Text';
      }

      const foundMode = CodeMirror.findModeByName(newMode);
      newMode = foundMode.mode;

      if (newMode && newMode !== currentMode) {
        this.editor.setOption('mode', newMode);
        CodeMirror.autoLoadMode(this.editor, newMode);
      }
    });

    this.editor.on('blur', () => {
      this.store.dispatch(new fromAction.SetContentForActiveEditorAction(this.editor.getValue()));
    });

    setTimeout(() => {
      this.editor.refresh();
    }, 0);
  }

  ngOnDestroy() {
    this.editorContent.unsubscribe();
  }

}
