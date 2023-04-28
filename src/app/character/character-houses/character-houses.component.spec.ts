import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterHousesComponent } from './character-houses.component';

describe('CharacterHousesComponent', () => {
  let component: CharacterHousesComponent;
  let fixture: ComponentFixture<CharacterHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
