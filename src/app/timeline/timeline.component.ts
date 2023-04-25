import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { MomentHttpService } from '../moment/moment-http.service';
import { MomentService } from '../moment/moment.service';
import { LinesService } from './lines.service';
import { MomentSpotService } from './moment-spot/moment-spot.service';
import { TimeLabelService } from './time-label.service';
import { TimelineService } from './timeline.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  constructor(private hostElement: ElementRef,
    public timelineService: TimelineService,
    public momentSpotService: MomentSpotService,
    public lineService: LinesService,
    public timeLabelService: TimeLabelService
  ) {
  
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // tell the timelineService the current canvas size
    const width = this.hostElement.nativeElement.offsetWidth;
    this.timelineService.setFullTimelineWidth(width);

    this.configureCanvasResize();
  }

  // tell the timelineService if the canvas size ever changes.
  private configureCanvasResize() {
    let obs = new ResizeObserver(entries => {
      //console.log(entries)
      for (let entry of entries) {
        const width = entry.contentRect.width;
        this.timelineService.setFullTimelineWidth(width);
      }
    })
    obs.observe(this.hostElement.nativeElement)
  }
}
