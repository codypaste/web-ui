import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { EditorModel } from 'src/app/_models/EditorModel';
import { ViewState, getEditors, getActiveEditorId } from 'src/app/_store/viewStore';
import * as fromActions from 'src/app/_store/viewStoreActions';

@Component({
  selector: 'app-editor-view-tabs',
  templateUrl: './editor-view-tabs.component.html',
  styleUrls: ['./editor-view-tabs.component.css']
})
export class EditorViewTabsComponent implements OnInit {

  activeEditorId$: Observable<string>;
  editors$: Observable<EditorModel[]>;

  constructor(
    private store: Store<ViewState>
  ) {
    this.editors$ = this.store.pipe(select(getEditors));
    this.activeEditorId$ = this.store.pipe(select(getActiveEditorId));
  }

  ngOnInit() {
  }

  switchActiveEditor(index) {
    this.store.dispatch(new fromActions.SwitchViewEditorAction(index));
  }

}
