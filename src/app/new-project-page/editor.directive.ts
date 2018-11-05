import { Directive, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewProjectState, getEditors, getActiveEditor } from '../_store/newProjectStore';
import * as fromAction from '../_store/actions';
import { EditorModel } from '../_models/EditorModel';


declare var CodeMirror: any;

const loadScipt = async () => {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'lazy-loaded-script.js';
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
  });
};

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {
  editor: any;
  editors$: Observable<EditorModel[]>;
  activeEditorId$: Observable<string>;
  constructor(el: ElementRef,
    private store: Store<NewProjectState>) {
    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true,
      mode: 'javascript',
      viewportMargin: 20,
    });

    this.editors$ = store.select(getEditors);
    this.activeEditorId$ = store.select(getActiveEditor);

    this.activeEditorId$.subscribe(editorId => {
      this.editors$.subscribe(editors => {
        editors.forEach(editor => {
          if (editor.id === editorId) {
            this.editor.setValue(editor.content || '');
          }
        });
      });
    });

    this.editor.on('blur', () => {
      this.store.dispatch(new fromAction.SetContentForActiveEditorAction(this.editor.getValue()));
    });

    setTimeout(() => {
      this.editor.refresh();
    }, 0);

    setTimeout(async () => {
      await loadScipt();
      this.editor.setOption('mode', 'javascript');
    }, 3000);
  }

}
