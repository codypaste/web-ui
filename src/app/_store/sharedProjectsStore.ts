import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from './sharedProjectsStoreActions';
import { LocalStorageProjectModel } from '../_models/LocalStorageProjectModel';

export interface SharedProjectsState {
  sharedProjects: LocalStorageProjectModel[]
  sharedProjectsNum: number
}

const getSingleFromStorage = (storageKey: string) : LocalStorageProjectModel => {
  return JSON.parse(localStorage.getItem(storageKey));
}

const retrieveSharedProjectsFromStorage = () => {
  const storageKeys = Object.keys(localStorage);
  const storedProjects: LocalStorageProjectModel[] = [];
  for (let i = 0; i <=storageKeys.length; i ++) {
    storedProjects.push(getSingleFromStorage(storageKeys[i]));
  }
  return storedProjects.filter(el => el !== null && el.projectId && el.projectCreationDate && el.projectTitle);
}

const setInitialState = () => {
  const storedProjects: LocalStorageProjectModel[] = retrieveSharedProjectsFromStorage();
  return {
    sharedProjects: storedProjects, 
    sharedProjectsNum: storedProjects.length
  }
}

export function reducer(state = setInitialState(), action: fromActions.ALL_ACTIONS): SharedProjectsState {
  switch (action.type) {

    case fromActions.ADD_PROJECT_TO_LOCAL_STORAGE: {
      const sharedProject: LocalStorageProjectModel = action.payload;

      const storageKey: string = sharedProject.projectId;
      localStorage.setItem(storageKey, JSON.stringify(sharedProject));
      const projectsInStorage = retrieveSharedProjectsFromStorage();
      return {
        ...state,
        sharedProjects: projectsInStorage, 
        sharedProjectsNum: projectsInStorage.length
      }
    };

    case fromActions.REMOVE_PROJECT_FROM_LOCAL_STORAGE: {
      const storageKey: string = action.payload;

      localStorage.removeItem(storageKey);
      const projectsInStorage = retrieveSharedProjectsFromStorage();
      return {
        ...state,
        sharedProjects: projectsInStorage, 
        sharedProjectsNum: projectsInStorage.length
      }
    }

    case fromActions.CLEAR_PROJECTS_FROM_LOCAL_STORAGE: {
      localStorage.clear();
      const projectsInStorage = retrieveSharedProjectsFromStorage();
      return {
        ...state,
        sharedProjects: projectsInStorage, 
        sharedProjectsNum: projectsInStorage.length
      }
    }

    default:
      return state;
  }
}

export const getViewState = createFeatureSelector<SharedProjectsState>('sharedProjectsState');

export const getSharedProjects = createSelector(
  getViewState,
    (state: SharedProjectsState) => state.sharedProjects
);

export const getAmountOfSharedProjects = createSelector(
  getViewState,
    (state: SharedProjectsState) => state.sharedProjectsNum
);