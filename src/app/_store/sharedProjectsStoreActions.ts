import { Action } from '@ngrx/store';
import { LocalStorageProjectModel } from '../_models/LocalStorageProjectModel';

export const ADD_PROJECT_TO_LOCAL_STORAGE = 'ADD_PROJECT_TO_LOCAL_STORAGE';
export const REMOVE_PROJECT_FROM_LOCAL_STORAGE = 'REMOVE_PROJECT_FROM_LOCAL_STORAGE';
export const CLEAR_PROJECTS_FROM_LOCAL_STORAGE = 'CLEAR_PROJECTS_FROM_STORAGE';

export class addSharedProjectToLocalStorage implements Action {
  readonly type = ADD_PROJECT_TO_LOCAL_STORAGE;

  constructor(public payload: LocalStorageProjectModel) { };
}

export class removeProjectFromLocalStoreAction implements Action {
  readonly type = REMOVE_PROJECT_FROM_LOCAL_STORAGE;

  constructor(public payload: string) { };
}

export class clearProjectsFromLocalStorageAction implements Action {
  readonly type = CLEAR_PROJECTS_FROM_LOCAL_STORAGE;

  constructor() { };
}

export type ALL_ACTIONS =
  addSharedProjectToLocalStorage |
  removeProjectFromLocalStoreAction |
  clearProjectsFromLocalStorageAction;
