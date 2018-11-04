import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewProjectState, getEditors, getActiveEditor} from '../_store/newProjectStore';
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

  constructor(
    private store: Store<NewProjectState>
  ) {
    this.editors$ = store.select(getEditors);
    this.activeEditorId$ = store.select(getActiveEditor);
  }

  ngOnInit() {
  }

  async onAddEditor() {
    this.store.dispatch(new fromActions.AddEditorAction());
  }

  switchActiveEditor(index) {
    this.store.dispatch(new fromActions.SwitchEditorAction(index));
  }

  onRemoveEditor(index) {
    console.log('editor delete', index);
  }

}
