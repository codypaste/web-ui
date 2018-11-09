import { Component, OnInit, OnDestroy } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Validators } from '@angular/forms';
import * as moment from 'moment';

import { ApiService } from '../../_services/api.service';
import { EditorModel } from '../../_models/EditorModel';
import { EncryptionService } from '../../_services/encryption.service';
import { GroupModel } from '../../_models/GroupModel';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';
import { NewProjectState, getEditors } from '../../_store/newProjectStore';
import { SnippetModel } from 'src/app/_models/SnippetModel';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit, OnDestroy {

  isPrivate = false;
  errors: ValidationErrors;
  visibilitySub: Subscription;

  projectMenuForm = new FormGroup({
    title: new FormControl(''),
    expiration: new FormControl('-1'),
    visibility: new FormControl('public'),
    password  : new FormControl(''),
    encryption: new FormControl(true)
  });

  editors$: Observable<EditorModel[]>;
  editorsSub: Subscription;
  editors: EditorModel[];

  constructor(
    private api: ApiService,
    private store: Store<NewProjectState>,
    private encryption: EncryptionService
  ) {
    this.editors$ = this.store.pipe(select(getEditors));
    this.editorsSub = this.editors$.subscribe(res => this.editors = res);
  }

  ngOnInit() {
    this.visibilitySub = this.projectMenuForm.get('visibility').valueChanges.subscribe(val => {
      if (val === 'private') {
        this.isPrivate = true;
        this.projectMenuForm.get('password').setValidators([Validators.required]);
        this.projectMenuForm.get('password').setValue('');
        this.projectMenuForm.get('password').updateValueAndValidity();
        return;
      }
      this.isPrivate = false;
      this.projectMenuForm.get('password').clearValidators();
      this.projectMenuForm.get('password').setValue('');
      this.projectMenuForm.get('password').updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.visibilitySub.unsubscribe();
    this.editorsSub.unsubscribe();
  }

  onSubmit() {
    const isPublic = this.projectMenuForm.get('visibility').value === 'public' ? true : false;
    let expirationDatetime;
    const expirationDuration = this.projectMenuForm.get('expiration').value;

    if (expirationDatetime !== '-1') {
      expirationDatetime = moment().add(moment.duration(expirationDuration)).format();
    }

    const group = new GroupModel();
    group.title = this.projectMenuForm.get('title').value || 'unnamed';
    group.isPublic = isPublic;
    group.expirationDatetime = expirationDatetime;

    if (!isPublic) {
      group.password = this.projectMenuForm.get('password').value;
    }

    let encryptedEditors = [...this.editors];
    if (this.projectMenuForm.get('encryption').value) {
      const key = this.encryption.generate256BitKey();
      group.title = this.encryption.encrypt(group.title, key);
      encryptedEditors = encryptedEditors.map(e => {
        e.content = this.encryption.encrypt(e.content, key);
        e.title = this.encryption.encrypt(e.title, key);
        return e;
      });
    }

    console.log(group);

    this.api.createGroup(group).pipe(
      flatMap((res: GroupPostResponseModel) => {
        const snippetsRequests = [];
        encryptedEditors.forEach(e => {
          const snippet = new SnippetModel();
          snippet.snippetName = e.title || 'unnamed';
          snippet.syntax = e.syntax;
          snippet.snippet = e.content;
          snippet.group = res._id;
          console.log(snippet);
          snippetsRequests.push(this.api.createSnippet(snippet));
        });

        return forkJoin(snippetsRequests);
      })
    ).subscribe((res) => {
      console.log(res);
    });
  }

}
