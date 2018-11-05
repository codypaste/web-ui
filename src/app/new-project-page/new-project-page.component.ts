import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewProjectState, getEditors, getActiveEditor, getNumberOfOpenedEditors} from '../_store/newProjectStore';
import * as fromActions from '../_store/actions';
import { EditorModel } from '../_models/EditorModel';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  editors$: Observable<EditorModel[]>;
  activeEditorId$: Observable<string>;
  numberOfOpenedEditors$: Observable<number>;
  fileName: string;

  constructor(
    private store: Store<NewProjectState>
  ) {
    this.editors$ = store.pipe(select(getEditors));
    this.activeEditorId$ = store.pipe(select(getActiveEditor));
    this.numberOfOpenedEditors$ = store.pipe(select(getNumberOfOpenedEditors));

    this.activeEditorId$.subscribe(editorId => {
      this.editors$.subscribe(editors => {
        editors.forEach(editor => {
          if (editor.id === editorId) {
            this.fileName = editor.title || '';
          }
        });
      });
    });
  }

  ngOnInit() {
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
