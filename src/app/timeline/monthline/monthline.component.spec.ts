import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlineComponent } from './monthline.component';

describe('MonthlineComponent', () => {
  let component: MonthlineComponent;
  let fixture: ComponentFixture<MonthlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
