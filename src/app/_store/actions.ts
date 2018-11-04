import { Action } from '@ngrx/store';

export const ADD_EDITOR = 'ADD_EDITOR';
export const REMOVE_EDITOR = 'REMOVE_EDITOR';
export const SWITCH_ACTIVE_EDITOR = 'SWITCH_ACTIVE_EDITOR';

export class AddEditorAction implements Action {
  readonly type = ADD_EDITOR;
}

export class SwitchEditorAction implements Action {
  readonly type = SWITCH_ACTIVE_EDITOR;

  constructor(public payload: number) {}
}

export type ALL_ACTIONS = AddEditorAction | SwitchEditorAction;
