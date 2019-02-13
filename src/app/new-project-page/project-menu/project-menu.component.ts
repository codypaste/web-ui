import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import * as moment from 'moment';

import { ApiService } from 'src/app/_services/api.service';
import { EditorModel } from 'src/app/_models/EditorModel';
import { EncryptionService } from 'src/app/_services/encryption.service';
import { GroupModel } from 'src/app/_models/GroupModel';
import { NewProjectState, getEditors } from 'src/app/_store/newProjectStore';
import { SnippetModel } from 'src/app/_models/SnippetModel';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Router } from '@angular/router';

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
    password  : new FormControl(''),
  });

  editors$: Observable<EditorModel[]>;
  editorsSub: Subscription;
  editors: EditorModel[];

  constructor(
    private api: ApiService,
    private store: Store<NewProjectState>,
    private encryption: EncryptionService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.editors$ = this.store.pipe(select(getEditors));
    this.editorsSub = this.editors$.subscribe(res => this.editors = res);
  }

  ngOnInit() {
    this.visibilitySub = this.projectMenuForm.get('visibility').valueChanges.subscribe(val => {
      if (val === 'private') {
        this.isPublic = false;
        this.projectMenuForm.get('password').setValidators([Validators.required]);
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
    if (expirationDuration !== '-1') {
      expirationDatetime = moment().add(moment.duration(expirationDuration)).format();
    }

    const isPublic = this.projectMenuForm.get('visibility').value === 'public' ? true : false;
    const group = new GroupModel();
    group.title = this.projectMenuForm.get('title').value || 'unnamed';
    group.isPublic = isPublic;
    group.expirationDatetime = expirationDatetime;
    group.title = this.encryption.encrypt(group.title, encryptionKey.key);
    group.isEncrypted = true;

    if (!isPublic) {
      group.password = this.projectMenuForm.get('password').value;
    }

    try {
      const res = await this.api.createGroup(group);
      const snippetsRequests = [];
      this.editors.forEach(editor => {
        const snippet = new SnippetModel();
        snippet.group = res.id;
        snippet.snippet = this.encryption.encrypt(editor.content || '', encryptionKey.key);
        snippet.snippetName = this.encryption.encrypt(editor.title || 'unnamed', encryptionKey.key);
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
