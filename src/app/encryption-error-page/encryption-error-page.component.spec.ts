import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionErrorPageComponent } from './encryption-error-page.component';

describe('EncryptionErrorPageComponent', () => {
  let component: EncryptionErrorPageComponent;
  let fixture: ComponentFixture<EncryptionErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptionErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
