import { Action } from '@ngrx/store';
import { GroupModel } from 'src/app/_models/GroupModel';
import { EditorModel } from 'src/app/_models/EditorModel';

export const SWITCH_ACTIVE_VIEW_EDITOR = 'SWITCH_ACTIVE_VIEW_EDITOR';
export const SET_GROUP_FROM_API = 'SET_GROUP_FROM_API';
export const SET_EDITORS_FROM_API = 'SET_EDITORS_FROM_API';

export class SwitchViewEditorAction implements Action {
  readonly type = SWITCH_ACTIVE_VIEW_EDITOR;

  constructor(public payload: number) {}
}

export class SetGroupFromAPI implements Action {
  readonly type = SET_GROUP_FROM_API;

  constructor(public payload: GroupModel) {}
}

export class SetEditorsFromAPI implements Action {
  readonly type = SET_EDITORS_FROM_API;

  constructor(public payload: EditorModel[]) {}
}

export type ALL_ACTIONS =
  SwitchViewEditorAction |
  SetGroupFromAPI |
  SetEditorsFromAPI;
