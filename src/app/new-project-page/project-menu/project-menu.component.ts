import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { NewProjectState, getEditors } from '../../_store/newProjectStore';
import { ApiService } from '../../api.service';
import { GroupModel } from '../../_models/GroupModel';
import { EditorModel } from '../../_models/EditorModel';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';
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
  ) {
    this.editors$ = store.pipe(select(getEditors));
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
      // add date calcualtion;
    }

    const group = new GroupModel();
    group.title = this.projectMenuForm.get('title').value || 'unnamed';
    group.isPublic = isPublic;
    group.expirationDatetime = expirationDatetime;

    if (!isPublic) {
      group.password = this.projectMenuForm.get('password').value;
    }

    this.api.createGroup(group).pipe(
      flatMap((res: GroupPostResponseModel) => {
        const snippetsRequests = [];
        this.editors.forEach(e => {
          const snippet = new SnippetModel();
          snippet.snippetName = e.title || 'unnamed';
          snippet.syntax = e.syntax;
          snippet.snippet = e.content;
          snippet.group = res._id;
          snippetsRequests.push(this.api.createSnippet(snippet));
        });

        return forkJoin(snippetsRequests);
      })
    ).subscribe((res) => {
      console.log(res);
    });
  }

}
