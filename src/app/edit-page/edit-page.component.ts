import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NewProjectState } from 'src/app/_store/newProjectStore';
import { EncryptionService } from 'src/app/_services/encryption.service';
import { GroupModel } from '../_models/GroupModel';
import { Router } from '@angular/router';
import { ErrorTypes } from '../_utils/errors';
import { ApiService } from 'src/app/_services/api.service';
import { EditorModel } from 'src/app/_models/EditorModel';
import * as fromActions from 'src/app/_store/newProjectActions';

@Component({
  selector: 'app-edit-page',
  templateUrl: '../new-project-page/new-project-page.component.html',
  styleUrls: ['../new-project-page/new-project-page.component.css']
})
export class EditPageComponent implements OnInit {

  requiresPassword: boolean;
  
  constructor(
    private _titleService: Title,
    private _api: ApiService,
    private route: ActivatedRoute,
    private _router: Router,
    private encryption: EncryptionService,
    private _store: Store<NewProjectState>
  ) {}

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

    this._store.dispatch(new fromActions.SetGroupToEdit(group));
    this._store.dispatch(new fromActions.SetEditorsForProjectToEdit(editors));
  }

  async retrieveProject(password: string) {
    this.requiresPassword = false;
    const id = this.route.snapshot.paramMap.get('id');
    try {
      const response = await this._api.retrieveProject(id, password);
      this.setView(response);
    } catch (e) {
      if (e.status === 401) {
        this.requiresPassword = true;
        return;
      }

      if (e.type === ErrorTypes.ENCRYPTION_ERROR) {
        this._router.navigateByUrl('/encryption-error', { skipLocationChange: true });
        return;
      }

      this._router.navigateByUrl('/not-found', { skipLocationChange: true });
    }
  }

  ngOnInit() {
    this.retrieveProject('');
  }
}
