import { TestBed } from '@angular/core/testing';

import { TimelineCanvasService } from './timeline-canvas.service';

describe('TimelineCanvasService', () => {
  let service: TimelineCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
