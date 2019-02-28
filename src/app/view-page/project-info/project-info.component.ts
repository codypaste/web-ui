import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { ViewState, getGroup } from 'src/app/_store/viewStore';
import { GroupModel } from 'src/app/_models/GroupModel';

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

  normalizeDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
}
