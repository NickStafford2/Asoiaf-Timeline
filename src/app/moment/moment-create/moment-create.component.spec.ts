import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentCreateComponent } from './moment-create.component';

describe('MomentCreateComponent', () => {
  let component: MomentCreateComponent;
  let fixture: ComponentFixture<MomentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MomentCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
