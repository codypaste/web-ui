import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  constructor(
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._titleService.setTitle('Create new project | CODYPASTE');
  }
}
