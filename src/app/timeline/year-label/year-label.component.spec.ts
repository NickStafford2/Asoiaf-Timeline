import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearLabelComponent } from './year-label.component';

describe('YearLabelComponent', () => {
  let component: YearLabelComponent;
  let fixture: ComponentFixture<YearLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
