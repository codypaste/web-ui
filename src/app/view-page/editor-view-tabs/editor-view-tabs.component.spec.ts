import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorViewTabsComponent } from './editor-view-tabs.component';

describe('EditorViewTabsComponent', () => {
  let component: EditorViewTabsComponent;
  let fixture: ComponentFixture<EditorViewTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorViewTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorViewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
