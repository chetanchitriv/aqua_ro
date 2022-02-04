import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedleadsComponent } from './assignedleads.component';

describe('AssignedleadsComponent', () => {
  let component: AssignedleadsComponent;
  let fixture: ComponentFixture<AssignedleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
