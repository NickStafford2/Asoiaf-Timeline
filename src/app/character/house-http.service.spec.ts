import { TestBed } from '@angular/core/testing';

import { HouseHttpService } from './house-http.service';

describe('HouseHttpService', () => {
  let service: HouseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
