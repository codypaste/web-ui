import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorModel } from 'src/app/_models/EditorModel';
import { Store, select } from '@ngrx/store';

import { NewProjectState, getEditors, getNumberOfOpenedEditors, getActiveEditor } from 'src/app/_store/newProjectStore';
import * as fromActions from 'src/app/_store/actions';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.css']
})
export class EditorTabsComponent implements OnInit {

  activeEditor$: Observable<EditorModel>;
  editors$: Observable<EditorModel[]>;
  numberOfOpenedEditors$: Observable<Number>;
  maxEditors: number;

  constructor(
    private store: Store<NewProjectState>
  ) {
    this.editors$ = this.store.pipe(select(getEditors));
    this.numberOfOpenedEditors$ = this.store.pipe(select(getNumberOfOpenedEditors));
    this.activeEditor$ = store.pipe(select(getActiveEditor));
    this.maxEditors = environment.maxEditors;
  }

  onCloseEditor(index) {
    const remove = confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromActions.CloseEditorAction(index));
    }
  }

  async onAddEditor() {
    this.store.dispatch(new fromActions.AddEditorAction());
  }

  switchActiveEditor(index) {
    this.store.dispatch(new fromActions.SwitchEditorAction(index));
  }

  ngOnInit() {
  }

}
