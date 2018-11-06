import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
export class EditorDirective implements OnDestroy {
  editor: any;
  editors$: Observable<EditorModel[]>;
  activeEditor$: Observable<EditorModel>;

  editorContent: Subscription;

  constructor(el: ElementRef,
    private store: Store<NewProjectState>) {
    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true,
      mode: 'javascript',
      viewportMargin: 20,
    });

    this.editors$ = store.pipe(select(getEditors));
    this.activeEditor$ = store.pipe(select(getActiveEditor));

    this.editorContent = this.activeEditor$.subscribe(editor => {
      this.editor.setValue(editor.content || '');
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

  ngOnDestroy() {
    this.editorContent.unsubscribe();
  }

}
