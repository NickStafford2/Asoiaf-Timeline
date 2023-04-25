import { TestBed } from '@angular/core/testing';

import { TimeLabelService } from './time-label.service';

describe('TimeLabelService', () => {
  let service: TimeLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
