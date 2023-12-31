import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-year-label',
  templateUrl: './year-label.component.html',
  styleUrls: ['./year-label.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearLabelComponent {
  //@Input() year: Event = { startTime: 0, duration: 0 };
  @Input() label = 'year here';

  @ViewChild('yearText') yearTextDiv?: ElementRef;
  //@ViewChild(TimelineChildDirective) vc?: TimelineChildDirective;

  padding = '0px';

  /*
  // not sure if this needs to be afterViewInit.
  ngOnInit(): void {
    // if (this.timelineChildDirective?.onChange$) {
    //this.timelineChildDirective.onChange$.subscribe(this._maybeAdjustSize.bind(this))
    this.timelineChildDirective.onChange$.subscribe(() => {
        this.padding = '100px';
        this.ref.detectChanges();
      })
    //}
  }
  */
  /*
  ngOnChanges(changes: SimpleChanges) {
    if (changes['year']) {
      const yearEvent: Event = changes['year'].currentValue as Event;
      const ts: number = yearEvent.startTime;
      const m: moment.Moment = moment(ts);
      //this.label = m.format('YYYY') + this.year.timeReadable;
    }
    
  }
  */
  /*
  private _maybeAdjustSize() {
    this.ngZone.run(() => {
      this.padding = '300px';
    })


    console.log("maybeAdjustSize")
    const smallestYearTimestamp: number = this.linesService.getSmallestYear();
    const timelineStart: number = this.timelineDateService.getStart();
    if (this.year.startTime === smallestYearTimestamp
      && smallestYearTimestamp < timelineStart
      && this.yearTextDiv
    ) {
      // todo: change size
      // get the star
      const diff = timelineStart - this.year.startTime;
      const pixelDiff = this.timelineService.getPixelsForDuration(diff);
      
      const el = this.yearTextDiv.nativeElement as HTMLElement;
      el.style.paddingLeft = "100px";
      this.yearTextDiv.nativeElement.style.marginLeft = '100px';
      
      this.padding = '' + pixelDiff + 'px';
      this.ref.detectChanges();
      //this.padding = '100px';
    }
  }
  */
}
