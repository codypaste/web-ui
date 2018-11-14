import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorModel } from 'src/app/_models/EditorModel';
import * as fromActions from './viewStoreActions';
import { GroupModel } from 'src/app/_models/GroupModel';

export interface ViewState {
  activeEditorId: string;
  editors: EditorModel[];
  group: GroupModel;
  activeEditor: EditorModel;
}

const initialState: ViewState = {
  activeEditorId: null,
  editors: [],
  group: null,
  activeEditor: null,
};

export function reducer(state = initialState, action: fromActions.ALL_ACTIONS): ViewState {
  switch (action.type) {
    case fromActions.SWITCH_ACTIVE_VIEW_EDITOR: {
      return {
        ...state,
        activeEditorId: state.editors[action.payload].id,
        activeEditor: state.editors[action.payload]
      };
    }

    case fromActions.SET_GROUP_FROM_API: {
      return {
        ...state,
        group: action.payload
      };
    }

    case fromActions.SET_EDITORS_FROM_API: {
      return {
        ...state,
        editors: action.payload,
        activeEditorId: action.payload[0].id,
        activeEditor: action.payload[0]
      };
    }

    default:
      return state;
  }
}

export const getViewState = createFeatureSelector<ViewState>('viewState');

export const getEditors = createSelector(
  getViewState,
    (state: ViewState) => state.editors
);

export const getActiveEditorId = createSelector(
  getViewState,
  (state: ViewState) => state.activeEditorId
);

export const getGroup = createSelector(
  getViewState,
  (state: ViewState) => state.group
);

export const getActiveEditor = createSelector(
  getViewState,
  (state: ViewState) => state.activeEditor
);
