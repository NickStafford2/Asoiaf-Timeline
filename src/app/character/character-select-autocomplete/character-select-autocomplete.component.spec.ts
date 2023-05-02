import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectAutocompleteComponent } from './character-select-autocomplete.component';

describe('CharacterSelectAutocompleteComponent', () => {
  let component: CharacterSelectAutocompleteComponent;
  let fixture: ComponentFixture<CharacterSelectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSelectAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSelectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
