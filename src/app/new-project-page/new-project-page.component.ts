import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NewProjectState } from 'src/app/_store/newProjectStore';
import { ResetState, SetContentForActiveEditorAction } from 'src/app/_store/newProjectActions';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  constructor(
    private _titleService: Title,
    private _store: Store<NewProjectState>
  ) {}

  ngOnInit() {
    this._store.dispatch(new ResetState());
    this._store.dispatch(new SetContentForActiveEditorAction(''));
    this._titleService.setTitle('Create new project | CODYPASTE');
  }
}
