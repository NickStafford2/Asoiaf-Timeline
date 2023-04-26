import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowLabelComponent } from './row-label.component';

describe('RowLabelComponent', () => {
  let component: RowLabelComponent;
  let fixture: ComponentFixture<RowLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
