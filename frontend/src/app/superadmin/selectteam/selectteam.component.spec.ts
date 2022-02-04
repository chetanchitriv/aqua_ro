import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectteamComponent } from './selectteam.component';

describe('SelectteamComponent', () => {
  let component: SelectteamComponent;
  let fixture: ComponentFixture<SelectteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
