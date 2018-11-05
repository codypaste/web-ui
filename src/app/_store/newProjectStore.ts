import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as uuid from 'uuid/v4';
import { EditorModel } from '../_models/EditorModel';
import * as fromActions from './actions';

export interface NewProjectState {
  activeEditorId: string;
  editors: EditorModel[];
  numberOfOpenedEditors: number;
  activeEditor: EditorModel;
}

const initialEditor = new EditorModel();
initialEditor.id = uuid();
initialEditor.title = 'unnamed';

const initialState: NewProjectState = {
  activeEditorId: initialEditor.id,
  editors: [initialEditor],
  numberOfOpenedEditors: 1,
  activeEditor: initialEditor,
};

export function reducer(state = initialState, action: fromActions.ALL_ACTIONS): NewProjectState {
  switch (action.type) {
    case fromActions.ADD_EDITOR: {
      const newEditor = new EditorModel();
      newEditor.id = uuid();
      newEditor.title = 'unnamed';
      const newState = {
        ...state,
        editors: [...state.editors, newEditor],
        numberOfOpenedEditors: state.numberOfOpenedEditors + 1
      };
      return newState;
    }

    case fromActions.SWITCH_ACTIVE_EDITOR: {
      return {
        ...state,
        activeEditorId: state.editors[action.payload].id,
        activeEditor: state.editors[action.payload]
      };
    }

    case fromActions.CLOSE_EDITOR: {
      const filtered = state.editors.filter(e => e.id !== state.editors[action.payload].id);
      return {
        ...state,
        editors: filtered,
        activeEditorId: filtered[0].id,
        activeEditor: filtered[0],
        numberOfOpenedEditors: state.numberOfOpenedEditors - 1
      };
    }

    case fromActions.SET_CONTENT_FOR_ACTIVE_EDITOR: {
      let editor;
      const newEditors = state.editors.map((e) => {
        if (e.id !== state.activeEditorId) {
          return e;
        }

        e.content = action.payload;
        editor = e;
        return e;
      });
      return {
        ...state,
        editors: newEditors,
        activeEditor: editor,
      };
    }

    case fromActions.SET_TITLE_FOR_ACTIVE_EDITOR: {
      let editor;
      const newEditors = state.editors.map((e) => {
        if (e.id !== state.activeEditorId) {
          return e;
        }

        e.title = action.payload;
        editor = e;
        return e;
      });
      return {
        ...state,
        editors: newEditors,
        activeEditor: editor,
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

export const getActiveEditorId = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.activeEditorId
);

export const getActiveEditor = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.activeEditor
);

export const getNumberOfOpenedEditors = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.numberOfOpenedEditors
);
