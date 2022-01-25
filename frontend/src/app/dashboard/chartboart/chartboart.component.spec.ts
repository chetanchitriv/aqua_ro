import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartboartComponent } from './chartboart.component';

describe('ChartboartComponent', () => {
  let component: ChartboartComponent;
  let fixture: ComponentFixture<ChartboartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartboartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartboartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
