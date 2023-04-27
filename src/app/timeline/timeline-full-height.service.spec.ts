import { TestBed } from '@angular/core/testing';

import { TimelineFullHeightService } from './timeline-full-height.service';

describe('TimelineFullHeightService', () => {
  let service: TimelineFullHeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineFullHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
