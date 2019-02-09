import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromNewProject from './newProjectStore';
import * as fromViewStore from './viewStore';
import * as fromSharedProjectsState from './sharedProjectsStore';
import { environment } from 'src/environments/environment';

export interface AppState {
  newProjectState: fromNewProject.NewProjectState;
  viewState: fromViewStore.ViewState;
  sharedProjectsState: fromSharedProjectsState.SharedProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  newProjectState: fromNewProject.reducer,
  viewState: fromViewStore.reducer,
  sharedProjectsState: fromSharedProjectsState.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
