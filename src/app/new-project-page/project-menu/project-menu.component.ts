import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Validators } from '@angular/forms';

import * as addMinutes from 'date-fns/add_minutes';
import * as addHours from 'date-fns/add_hours';
import * as addDays from 'date-fns/add_days';
import * as addMonths from 'date-fns/add_months';

import { ApiService } from 'src/app/_services/api.service';
import { EditorModel } from 'src/app/_models/EditorModel';
import { EncryptionService } from 'src/app/_services/encryption.service';
import { GroupModel } from 'src/app/_models/GroupModel';
import {
  NewProjectState,
  getEditors,
  getSnippetsGroup
} from 'src/app/_store/newProjectStore';
import { SnippetModel } from 'src/app/_models/SnippetModel';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Router } from '@angular/router';
import { SharedProjectsState } from 'src/app/_store/sharedProjectsStore';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';
import { LocalStorageProjectModel } from 'src/app/_models/LocalStorageProjectModel';
import * as fromStorageStoreActions from 'src/app/_store/sharedProjectsStoreActions';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit, OnDestroy {
  isPublic = true;
  errors: ValidationErrors;
  visibilitySub: Subscription;
  isSubmitted = false;

  projectMenuForm = new FormGroup({
    title: new FormControl(''),
    expiration: new FormControl('-1'),
    visibility: new FormControl('public'),
    password: new FormControl(''),
    shouldSaveSharedProject: new FormControl(true)
  });

  editors$: Observable<EditorModel[]>;
  snippetsGroup$: Observable<GroupModel>;
  groupSub: Subscription;
  group: GroupModel;
  editorsSub: Subscription;
  editors: EditorModel[];

  constructor(
    private api: ApiService,
    private newProjectStore: Store<NewProjectState>,
    private sharedProjectsStore: Store<SharedProjectsState>,
    private encryption: EncryptionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.snippetsGroup$ = this.newProjectStore.pipe(select(getSnippetsGroup));
    this.groupSub = this.snippetsGroup$.subscribe(res => (this.group = res));

    this.editors$ = this.newProjectStore.pipe(select(getEditors));
    this.editorsSub = this.editors$.subscribe(res => (this.editors = res));
  }

  ngOnInit() {
    this.visibilitySub = this.projectMenuForm
      .get('visibility')
      .valueChanges.subscribe(val => {
        if (val === 'private') {
          this.isPublic = false;
          this.projectMenuForm
            .get('password')
            .setValidators([Validators.required]);
          this.projectMenuForm.get('password').setValue('');
          this.projectMenuForm.get('password').updateValueAndValidity();
          return;
        }
        this.isPublic = true;
        this.projectMenuForm.get('password').clearValidators();
        this.projectMenuForm.get('password').setValue('');
        this.projectMenuForm.get('password').updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.visibilitySub.unsubscribe();
    this.editorsSub.unsubscribe();
  }

  saveSharedProjectInStorage(
    sharedGroup: GroupPostResponseModel,
    encryptionKey: string
  ) {
    const { createdAt, title, id, isEncrypted } = sharedGroup;
    const decryptedTitle = isEncrypted
      ? this.encryption.decrypt(title, encryptionKey)
      : title;
    const project = new LocalStorageProjectModel(
      id,
      decryptedTitle,
      createdAt,
      encryptionKey
    );

    this.sharedProjectsStore.dispatch(
      new fromStorageStoreActions.addSharedProjectToLocalStorage(project)
    );
  }

  async onSubmit() {
    if (this.isSubmitted) {
      return;
    }

    this.isSubmitted = true;

    const anyEmpty = this.editors.some(e => {
      return e.content.length === 0;
    });

    if (anyEmpty) {
      this.toastr.error('Please fill all opened editors with text.');
      this.isSubmitted = false;
      return;
    }

    const encryptionKey = this.encryption.generate256BitKey();

    const expirationDuration = this.projectMenuForm.get('expiration').value;
    let expirationDatetime;

    // there is no better way to do it probably, date-fns does not handle ISO8601 durations
    // https://github.com/date-fns/date-fns/issues/284
    switch (expirationDuration) {
      case 'PT5M': {
        expirationDatetime = addMinutes(new Date(), 5).toISOString();
        break;
      }
      case 'PT15M': {
        expirationDatetime = addMinutes(new Date(), 15).toISOString();
        break;
      }
      case 'PT30M': {
        expirationDatetime = addMinutes(new Date(), 30).toISOString();
        break;
      }
      case 'PT1H': {
        expirationDatetime = addHours(new Date(), 1).toISOString();
        break;
      }
      case 'PT12H': {
        expirationDatetime = addHours(new Date(), 12).toISOString();
        break;
      }
      case 'P1D': {
        expirationDatetime = addDays(new Date(), 1).toISOString();
        break;
      }
      case 'P7D': {
        expirationDatetime = addDays(new Date(), 7).toISOString();
        break;
      }
      case 'P14D': {
        expirationDatetime = addDays(new Date(), 14).toISOString();
        break;
      }
      case 'P1M': {
        expirationDatetime = addMonths(new Date(), 1).toISOString();
        break;
      }
      case 'P6M': {
        expirationDatetime = addMonths(new Date(), 6).toISOString();
        break;
      }
      case 'P1Y': {
        expirationDatetime = addMonths(new Date(), 12).toISOString();
        break;
      }
    }

    const isPublic =
      this.projectMenuForm.get('visibility').value === 'public' ? true : false;
    const group = new GroupModel();
    group.title = this.projectMenuForm.get('title').value || this.group.title;
    group.isPublic = isPublic;
    group.expirationDatetime = expirationDatetime;
    group.title = this.encryption.encrypt(group.title, encryptionKey.key);
    group.isEncrypted = true;

    if (!isPublic) {
      group.password = this.projectMenuForm.get('password').value;
    }

    try {
      const res = await this.api.createGroup(group);
      if (this.projectMenuForm.get('shouldSaveSharedProject').value === true) {
        this.saveSharedProjectInStorage(res, encryptionKey.normalized);
      }

      const snippetsRequests = [];
      this.editors.forEach(editor => {
        const snippet = new SnippetModel();
        snippet.group = res.id;
        snippet.snippet = this.encryption.encrypt(
          editor.content || '',
          encryptionKey.key
        );
        snippet.snippetName = this.encryption.encrypt(
          editor.title || 'unnamed',
          encryptionKey.key
        );
        snippet.syntax = editor.syntax;
        snippetsRequests.push(this.api.createSnippet(snippet));
      });

      await Promise.all(snippetsRequests);
      this.router.navigate(['/view', res.id], {
        queryParams: {
          key: encryptionKey.normalized
        }
      });
    } catch (e) {
      this.toastr.error('Something went wrong. Try again');
      this.isSubmitted = false;
      return;
    }

    this.isSubmitted = false;
  }
}
