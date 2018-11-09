import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromNewProject from './newProjectStore';
import { environment } from 'src/environments/environment';

export interface AppState {
  newProjectState: fromNewProject.NewProjectState;
}

export const reducers: ActionReducerMap<AppState> = {
  newProjectState: fromNewProject.reducer
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
