import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockallotmentComponent } from './stockallotment.component';

describe('StockallotmentComponent', () => {
  let component: StockallotmentComponent;
  let fixture: ComponentFixture<StockallotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockallotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockallotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
