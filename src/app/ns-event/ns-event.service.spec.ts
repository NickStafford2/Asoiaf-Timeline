import { TestBed } from '@angular/core/testing';

import { NsEventService } from './ns-event.service';

describe('NsEventService', () => {
  let service: NsEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
