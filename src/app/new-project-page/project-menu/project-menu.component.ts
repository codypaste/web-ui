import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import {GroupModel} from '../../_models/GroupModel';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';

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

  constructor(
    private api: ApiService,
  ) { }

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
        console.log(res._id);
        return this.api.createGroup(group);
      })
    ).subscribe((res) => {
      console.log(res);
    });
  }

}
