import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorModel } from 'src/app/_models/EditorModel';
import { GroupModel } from 'src/app/_models/GroupModel';
import * as fromActions from './newProjectActions';
import * as uuid from 'uuid/v4';

export interface NewProjectState {
  snippetsGroup: GroupModel,
  activeEditorId: string;
  editors: EditorModel[];
  numberOfOpenedEditors: number;
  activeEditor: EditorModel;
}

const setDefaultSnippetName = editorIndex => `Snippet_${editorIndex}`;

const getInitialEditor = (editorIndex) => {
  const x = new EditorModel();
  x.id = uuid();
  x.title = setDefaultSnippetName(editorIndex);
  x.syntax = 'Plain Text';
  x.content = '';
  return x;
};

const defaultSnippetsGroup = () => {
  const g = new GroupModel();
  g.title = 'Unnamed project';
  return g;
}

const initialEditor = getInitialEditor(1);
const getInitalState = () => {
  return {
    snippetsGroup: defaultSnippetsGroup(),
    activeEditorId: initialEditor.id,
    editors: [initialEditor],
    numberOfOpenedEditors: 1,
    activeEditor: initialEditor,
  };
};

const initialState = getInitalState();

export function reducer(state = initialState, action: fromActions.ALL_ACTIONS): NewProjectState {
  switch (action.type) {
    case fromActions.ADD_EDITOR: {
      const numOfOpenedEditors = state.numberOfOpenedEditors + 1;
      const newEditor = getInitialEditor(numOfOpenedEditors);
      const newState = {
        ...state,
        editors: [...state.editors, newEditor],
        activeEditorId: newEditor.id,
        activeEditor: newEditor,
        numberOfOpenedEditors: numOfOpenedEditors
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

    case fromActions.SET_SYNTAX_FOR_ACTIVE_EDITOR: {
      let editor;
      const newEditors = state.editors.map((e) => {
        if (e.id !== state.activeEditorId) {
          return e;
        }

        e.syntax = action.payload;
        editor = e;
        return e;
      });
      return {
        ...state,
        editors: newEditors,
        activeEditor: {...editor},
      };
    }

    case fromActions.SET_EDITORS_FOR_PROJECT_TO_EDIT: {
      const projectEditors = action.payload;

      return {
        ...state,
        editors: projectEditors,
        activeEditorId: projectEditors[0].id,
        numberOfOpenedEditors: projectEditors.length
      };
    }

    case fromActions.SET_GROUP_TO_EDIT: {
      const snippetsGroup = action.payload;
      return {
        ...state,
        snippetsGroup
      }      
    }

    case fromActions.RESET_STATE: {
      return getInitalState();
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

export const getActiveEditorSyntax = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.activeEditor.syntax
);

export const getSnippetsGroup = createSelector(
  getNewProjectState,
  (state: NewProjectState) => state.snippetsGroup
);
