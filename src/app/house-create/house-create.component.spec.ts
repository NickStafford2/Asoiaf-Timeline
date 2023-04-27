import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCreateComponent } from './house-create.component';

describe('HouseCreateComponent', () => {
  let component: HouseCreateComponent;
  let fixture: ComponentFixture<HouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
