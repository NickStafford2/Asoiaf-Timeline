import { TestBed } from '@angular/core/testing';

import { NsEventHttpService } from './ns-event-http.service';

describe('NsEventHttpService', () => {
  let service: NsEventHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsEventHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
