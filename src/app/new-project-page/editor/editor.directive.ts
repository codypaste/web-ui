import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { NewProjectState, getActiveEditor } from 'src/app/_store/newProjectStore';
import * as fromAction from 'src/app/_store/newProjectActions';
import { EditorModel } from 'src/app/_models/EditorModel';

declare var CodeMirror: any;

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective implements OnDestroy {
  editor: any;
  activeEditor$: Observable<EditorModel>;
  editorContent: Subscription;

  constructor(el: ElementRef,
    private store: Store<NewProjectState>) {
    CodeMirror.modeURL = 'cm-%N.js';

    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true
    });

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
