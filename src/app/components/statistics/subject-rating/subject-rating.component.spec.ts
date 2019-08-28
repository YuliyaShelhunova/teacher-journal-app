import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectRatingComponent } from './subject-rating.component';

describe('SubjectRatingComponent', () => {
  let component: SubjectRatingComponent;
  let fixture: ComponentFixture<SubjectRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
