import { TestBed } from '@angular/core/testing';

import { TimelineDateService } from './timeline-date.service';

describe('TimelineDateService', () => {
  let service: TimelineDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
