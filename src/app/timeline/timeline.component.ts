import { AfterViewInit, Component, ElementRef } from '@angular/core';

import { LinesService } from './lines.service';
import { MomentSpotService } from './moment-spot/moment-spot.service';
import { TimeLabelService } from './time-label.service';
import { TimelineService } from './timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterViewInit {
  constructor(
    private hostElement: ElementRef,
    public timelineService: TimelineService,
    public momentSpotService: MomentSpotService,
    public lineService: LinesService,
    public timeLabelService: TimeLabelService
  ) {}

  ngAfterViewInit(): void {
    // tell the timelineService the current canvas size
    const width = this.hostElement.nativeElement.offsetWidth;
    this.timelineService.setFullTimelineWidth(width);

    this.configureCanvasResize();
  }

  // tell the timelineService if the canvas size ever changes.
  private configureCanvasResize() {
    const obs = new ResizeObserver(entries => {
      //console.log(entries)
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.timelineService.setFullTimelineWidth(width);
      }
    });
    obs.observe(this.hostElement.nativeElement);
  }
}
