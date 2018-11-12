import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ApiService } from 'src/app/_services/api.service';
import { EncryptionService } from 'src/app/_services/encryption.service';
import { ViewState } from 'src/app/_store/viewStore';
import * as fromActions from 'src/app/_store/viewStoreActions';
import { GroupModel } from 'src/app/_models/GroupModel';
import { EditorModel } from 'src/app/_models/EditorModel';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private store: Store<ViewState>,
    private encryption: EncryptionService,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const key = this.route.snapshot.queryParams.key;
    const response = await this.api.retrieveProject(id);

    console.log(response);

    const isEncrypted = response.group.isEncrypted;

    const group = new GroupModel();
    group.title = isEncrypted ? this.encryption.decrypt(response.group.title, key) : response.group.title;
    group.expirationDatetime = response.group.expirationDatetime;
    group.isPublic = response.group.isPublic;
    group._id = response.group._id;
    group.createdAt = response.group.createdAt;
    group.isEncrypted = response.group.isEncrypted;

    const editors = [];
    response.snippets.forEach(s => {
      const e = new EditorModel();
      e.id = s._id;
      e.content = isEncrypted ? this.encryption.decrypt(s.snippet, key) : s.snippet;
      e.title = isEncrypted ? this.encryption.decrypt(s.snippetName, key) : s.snippetName;
      e.syntax = s.syntax;
      editors.push(e);
    });

    this.store.dispatch(new fromActions.SetGroupFromAPI(group));
    this.store.dispatch(new fromActions.SetEditorsFromAPI(editors));
  }

}
