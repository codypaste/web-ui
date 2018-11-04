import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit {

  isPrivate = false;
  errors: ValidationErrors;

  projectMenuForm = new FormGroup({
    title: new FormControl(''),
    expiration: new FormControl('-1'),
    visibility: new FormControl('public'),
    password  : new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
    this.onChanges();
  }

  onChanges(): void {
    this.projectMenuForm.get('visibility').valueChanges.subscribe(val => {
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

  onSubmit() {
    console.warn(this.projectMenuForm.value);
  }

}
