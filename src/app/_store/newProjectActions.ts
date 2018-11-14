import { Action } from '@ngrx/store';
import { GroupModel } from 'src/app/_models/GroupModel';
import { EditorModel } from 'src/app/_models/EditorModel';

export const ADD_EDITOR = 'ADD_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';
export const SWITCH_ACTIVE_EDITOR = 'SWITCH_ACTIVE_EDITOR';
export const SET_CONTENT_FOR_ACTIVE_EDITOR = 'SET_CONTENT_FOR_ACTIVE_EDITOR';
export const SET_TITLE_FOR_ACTIVE_EDITOR = 'SET_TITLE_FOR_ACTIVE_EDITOR';
export const SET_SYNTAX_FOR_ACTIVE_EDITOR = 'SET_SYNTAX_FOR_ACTIVE_EDITOR';
export const SET_GROUP_FROM_API = 'SET_GROUP_FROM_API';
export const SET_EDITORS_FROM_API = 'SET_EDITORS_FROM_API';
export const RESET_STATE = 'RESET_STATE';

export class AddEditorAction implements Action {
  readonly type = ADD_EDITOR;
}

export class SwitchEditorAction implements Action {
  readonly type = SWITCH_ACTIVE_EDITOR;

  constructor(public payload: number) {}
}

export class CloseEditorAction implements Action {
  readonly type = CLOSE_EDITOR;

  constructor(public payload: number) {}
}

export class SetContentForActiveEditorAction implements Action {
  readonly type = SET_CONTENT_FOR_ACTIVE_EDITOR;

  constructor(public payload: string) {}
}

export class SetTitleForActiveEditorAction implements Action {
  readonly type = SET_TITLE_FOR_ACTIVE_EDITOR;

  constructor(public payload: string) {}
}

export class SetSyntaxForActiveEditorAction implements Action {
  readonly type = SET_SYNTAX_FOR_ACTIVE_EDITOR;

  constructor(public payload: string) {}
}

export class SetGroupFromAPI implements Action {
  readonly type = SET_GROUP_FROM_API;

  constructor(public payload: GroupModel) {}
}

export class SetEditorsFromAPI implements Action {
  readonly type = SET_EDITORS_FROM_API;

  constructor(public payload: EditorModel[]) {}
}

export class ResetState implements Action {
  readonly type = RESET_STATE;

  constructor() {}
}

export type ALL_ACTIONS =
  AddEditorAction |
  SwitchEditorAction |
  CloseEditorAction |
  SetContentForActiveEditorAction |
  SetTitleForActiveEditorAction |
  SetSyntaxForActiveEditorAction |
  SetGroupFromAPI |
  SetEditorsFromAPI |
  ResetState;
