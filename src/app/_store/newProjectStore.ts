import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as uuid from 'uuid/v4';
import { EditorModel } from '../_models/EditorModel';
import * as fromActions from './actions';

export interface NewProjectState {
  activeEditorId: string;
  editorsIds: string[];
  editors: EditorModel[];
}

const initialEditor = new EditorModel();
initialEditor.id = uuid();
initialEditor.title = 'unnamed';

const initialState: NewProjectState = {
  activeEditorId: initialEditor.id,
  editorsIds: [],
  editors: [initialEditor]
};

export function reducer(state = initialState, action: fromActions.ALL_ACTIONS): NewProjectState {
  switch (action.type) {
    case fromActions.ADD_EDITOR: {
      const newEditor = new EditorModel();
      newEditor.id = uuid();
      newEditor.title = 'unnamed';
      const newState = {
        ...state,
        editors: [...state.editors, newEditor]
      };
      return newState;
    }

    case fromActions.SWITCH_ACTIVE_EDITOR: {
      return {
        ...state,
        activeEditorId: state.editors[action.payload].id,
      };
    }
    default:
      return state;
  }
}

export const getNewProjectState = createFeatureSelector<NewProjectState>('newProjectState');

export const getEditors = createSelector(
    getNewProjectState,
    (state: NewProjectState) => state.editors
);

export const getActiveEditor = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.activeEditorId
);
