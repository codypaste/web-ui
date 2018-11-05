import { Action } from '@ngrx/store';

export const ADD_EDITOR = 'ADD_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';
export const SWITCH_ACTIVE_EDITOR = 'SWITCH_ACTIVE_EDITOR';
export const SET_CONTENT_FOR_ACTIVE_EDITOR = 'SET_CONTENT_FOR_ACTIVE_EDITOR';
export const SET_TITLE_FOR_ACTIVE_EDITOR = 'SET_TITLE_FOR_ACTIVE_EDITOR';

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

export type ALL_ACTIONS =
  AddEditorAction |
  SwitchEditorAction |
  CloseEditorAction |
  SetContentForActiveEditorAction |
  SetTitleForActiveEditorAction;
