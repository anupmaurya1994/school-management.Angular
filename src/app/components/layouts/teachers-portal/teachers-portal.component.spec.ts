import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPortalComponent } from './teachers-portal.component';

describe('TeachersPortalComponent', () => {
  let component: TeachersPortalComponent;
  let fixture: ComponentFixture<TeachersPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersPortalComponent]
    });
    fixture = TestBed.createComponent(TeachersPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
