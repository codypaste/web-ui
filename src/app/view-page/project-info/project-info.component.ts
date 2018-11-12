import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewState, getGroup } from 'src/app/_store/viewStore';
import { Store, select } from '@ngrx/store';
import { GroupModel } from 'src/app/_models/GroupModel';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit, OnDestroy {
  group$: Observable<GroupModel>;
  group: GroupModel = new GroupModel();
  groupSub: Subscription;

  constructor(
    private store: Store<ViewState>
  ) {
    this.group$ = this.store.pipe(select(getGroup));
    this.groupSub = this.group$.subscribe(g => {
      if (g) {
        this.group = g;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.groupSub.unsubscribe();
  }

}
