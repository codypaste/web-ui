import {Directive, ElementRef, OnDestroy} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ViewState, getActiveEditor } from 'src/app/_store/viewStore';
import { Observable, Subscription } from 'rxjs';
import { EditorModel } from 'src/app/_models/EditorModel';

declare var CodeMirror: any;

@Directive({
  selector: '[appViewEditor]'
})
export class ViewEditorDirective implements OnDestroy {
  editor: any;
  activeEditor$: Observable<EditorModel>;
  editorContent: Subscription;

  constructor(
    el: ElementRef,
    private store: Store<ViewState>
    ) {
    CodeMirror.modeURL = 'cm-%N.js';

    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true,
      readOnly: true,
    });

    this.activeEditor$ = this.store.pipe(select(getActiveEditor));

    this.editorContent = this.activeEditor$.subscribe(editor => {
      if (!editor) {
        return null;
      }

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

    setTimeout(() => {
      this.editor.refresh();
    }, 0);
  }

  ngOnDestroy() {
    this.editorContent.unsubscribe();
  }
}
