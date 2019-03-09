import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SharedProjectsState, getSharedProjects, getAmountOfSharedProjects } from '../_store/sharedProjectsStore';
import { Observable } from 'rxjs';
import { LocalStorageProjectModel } from '../_models/LocalStorageProjectModel';

import * as fromActions from 'src/app/_store/sharedProjectsStoreActions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-projects',
  templateUrl: './shared-projects.component.html',
  styleUrls: ['./shared-projects.component.css']
})
export class SharedProjectsComponent implements OnInit {

  sharedProjects$: Observable<LocalStorageProjectModel[]>;
  sharedProjectsAmount$: Observable<number>;

  constructor(
    private sharedProjectsStore: Store<SharedProjectsState>,
    private router: Router,
  ) {
    // Required because of problems with redirection to same route with different params, see: https://stackoverflow.com/questions/48006629/angular-navigate-to-the-same-route-with-different-parameter
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.sharedProjects$ = this.sharedProjectsStore.pipe(select(getSharedProjects));
    this.sharedProjectsAmount$ = this.sharedProjectsStore.pipe(select(getAmountOfSharedProjects));
  }

  onViewRedirect(projectId: string, key: string) {
    this.router.navigate(['/view', projectId], {
      queryParams: {
        key
      }
    });
  }

  onRemoveProject(projectId: string) {
    this.sharedProjectsStore.dispatch(new fromActions.removeProjectFromLocalStoreAction(projectId));
  }

  ngOnInit() {
  }

}
