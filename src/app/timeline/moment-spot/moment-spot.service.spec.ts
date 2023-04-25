import { TestBed } from '@angular/core/testing';

import { MomentSpotService } from './moment-spot.service';

describe('MomentSpotService', () => {
  let service: MomentSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
