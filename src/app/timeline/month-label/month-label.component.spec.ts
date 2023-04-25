import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthLabelComponent } from './month-label.component';

describe('MonthLabelComponent', () => {
  let component: MonthLabelComponent;
  let fixture: ComponentFixture<MonthLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
