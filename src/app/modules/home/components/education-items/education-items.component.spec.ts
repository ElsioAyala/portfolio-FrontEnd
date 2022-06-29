import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationItemsComponent } from './education-items.component';

describe('EducationItemsComponent', () => {
  let component: EducationItemsComponent;
  let fixture: ComponentFixture<EducationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
