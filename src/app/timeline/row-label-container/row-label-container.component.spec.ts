import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowLabelContainerComponent } from './row-label-container.component';

describe('RowLabelContainerComponent', () => {
  let component: RowLabelContainerComponent;
  let fixture: ComponentFixture<RowLabelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowLabelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowLabelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
