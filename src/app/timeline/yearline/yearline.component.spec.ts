import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlineComponent } from './yearline.component';

describe('YearlineComponent', () => {
  let component: YearlineComponent;
  let fixture: ComponentFixture<YearlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
