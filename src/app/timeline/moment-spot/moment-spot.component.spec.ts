import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentSpotComponent } from './moment-spot.component';

describe('MomentSpotComponent', () => {
  let component: MomentSpotComponent;
  let fixture: ComponentFixture<MomentSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MomentSpotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
