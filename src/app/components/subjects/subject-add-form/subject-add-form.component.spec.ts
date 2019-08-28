import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAddFormComponent } from './subject-add-form.component';

describe('SubjectAddFormComponent', () => {
  let component: SubjectAddFormComponent;
  let fixture: ComponentFixture<SubjectAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
