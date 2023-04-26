import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEventComponent } from './ns-event.component';

describe('NsEventComponent', () => {
  let component: NsEventComponent;
  let fixture: ComponentFixture<NsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NsEventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
