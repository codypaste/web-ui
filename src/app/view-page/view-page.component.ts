import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/_services/api.service';
import { EncryptionService } from 'src/app/_services/encryption.service';
import { ViewState } from 'src/app/_store/viewStore';
import * as fromActions from 'src/app/_store/viewStoreActions';
import * as fromStorageStoreActions from 'src/app/_store/sharedProjectsStoreActions'
import { GroupModel } from 'src/app/_models/GroupModel';
import { EditorModel } from 'src/app/_models/EditorModel';
import { ErrorTypes } from '../_utils/errors';
import { SharedProjectsState } from '../_store/sharedProjectsStore';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  dataLoaded = false;
  requiresPassword = false;
  password = '';
  passwordTries = 0;

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
    private store: Store<ViewState>,
    private encryption: EncryptionService,
    private sharedProjectsStore: Store<SharedProjectsState>,
    private _titleService: Title,
    private _router: Router,
  ) { }

  setView(project) {
    const key = this.route.snapshot.queryParams.key;
    const isEncrypted = project.group.isEncrypted;

    const group = new GroupModel();
    group.title = isEncrypted ? this.encryption.decrypt(project.group.title, key) : project.group.title;
    group.expirationDatetime = project.group.expirationDatetime;
    group.isPublic = project.group.isPublic;
    group.id = project.group.id;
    group.createdAt = project.group.createdAt;
    group.isEncrypted = project.group.isEncrypted;

    this._titleService.setTitle(group.title + ' | CODYPASTE');

    const editors = [];
    project.snippets.forEach(s => {
      const e = new EditorModel();
      e.id = s.id;
      e.content = isEncrypted ? this.encryption.decrypt(s.snippet, key) : s.snippet;
      e.title = isEncrypted ? this.encryption.decrypt(s.snippetName, key) : s.snippetName;
      e.syntax = s.syntax;
      editors.push(e);
    });

    this.store.dispatch(new fromActions.SetGroupFromAPI(group));
    this.store.dispatch(new fromActions.SetEditorsFromAPI(editors));
  }

  async retrieveProject(password: string) {
    this.dataLoaded = false;
    this.requiresPassword = false;
    const id = this.route.snapshot.paramMap.get('id');
    try {
      const response = await this._api.retrieveProject(id, password);
      this.setView(response);
      this.dataLoaded = true;
    } catch (e) {
      if (e.status === 401) {
        this.requiresPassword = true;
        return;
      }

      if (e.type === ErrorTypes.ENCRYPTION_ERROR) {
        this._router.navigateByUrl('/encryption-error', { skipLocationChange: true });
        return;
      }

      // Remove not found project from local storage if it was present there
      this.sharedProjectsStore.dispatch(
        new fromStorageStoreActions.removeProjectFromLocalStoreAction(id)
      );

      this._router.navigateByUrl('/not-found', { skipLocationChange: true });
    }
  }

  async ngOnInit() {
    this.passwordTries = 0;
    this.password = '';
    await this.retrieveProject('');
  }

  async onSubmit() {
    await this.retrieveProject(this.password);
    this.passwordTries += 1;
    this.password = '';
  }

}
