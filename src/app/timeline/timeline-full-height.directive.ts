import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

import { TimelineService } from './timeline.service';

@Directive({
  selector: '[appTimelineFullHeight]',
})
export class TimelineFullHeightDirective implements AfterViewInit, OnInit {
  constructor(
    private hostElement: ElementRef,
    public timelineService: TimelineService
  ) {
    console.log('timelinefullHeight');
  }

  ngOnInit() {
    console.log('timelinefullHeight');
  }

  ngAfterViewInit(): void {
    // tell the timelineService the current canvas size
    const el = this.hostElement.nativeElement as HTMLElement;
    this.timelineService.heightInPixles$.subscribe((height: number) => {
      el.style.height = height + 'px';
    });
  }
}
