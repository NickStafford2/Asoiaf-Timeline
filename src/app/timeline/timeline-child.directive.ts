import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimeLabel, TimelineChild } from '../_library';
import { TimelineService } from './timeline.service';

@Directive({
  selector: '[appTimelineChild]'
})
export class TimelineChildDirective implements OnChanges {
  // @Input() startTime: number = 0;
  // @Input() duration: number = 0;
  //@Input() child?: TimelineChild;
  @Input() xOffset: number = 0;
  @Input() width: number = 0;

  private _onChange$: Subject<void> = new Subject<void>();
  public readonly onChange$: Observable<void> = this._onChange$.asObservable();

  constructor(private hostElement: ElementRef, private timelineService: TimelineService) {
    timelineService.redraw$.subscribe(() => {
      console.log('redraw called');
      /*
      if (this.child?.xOffset) {
        this._setXOffset(this.child?.xOffset);
      }
      if (this.child?.width) {
        this.setWidth(this.child.width)
      }
      */
      if (this.xOffset) {
        this._setXOffset(this.xOffset);
      }
      if (this.width) {
        this._setWidth(this.width)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // not sure if this is needed?
    /*
    const child: TimelineChild = changes['child'].currentValue;
    if (child) {
      this._setXOffset(child.xOffset);
      this.setWidth(child.width);
    }
    */
    const xOffset: number = changes['xOffset'].currentValue;
    if (xOffset) {
      this._setXOffset(xOffset);
    }
    const width: number = changes['width'].currentValue;
    if (width) {
      this._setWidth(width);
    }
  }

/*  private _setXOffset(timestamp: number) {
    this.xOffset = this.timelineService.getPixelsForTimestamp(timestamp);
    this.hostElement.nativeElement.style.transform = "translate(" + this.xOffset + "px, 0px)";
    this._onChange$.next();
  }

  private setWidth(duration: number) {
    const width = this.timelineService.getPixelsForDuration(duration);
    this.hostElement.nativeElement.style.width = "" + width + "px";//  px = // transform = "translate(" + this.xOffset + "px, 0px)";
    this._onChange$.next();
  }
  */

  private _setXOffset(xOffset: number) {
    this.hostElement.nativeElement.style.transform = "translate(" + xOffset + "px, 0px)";
  }

  private _setWidth(width: number) {
    this.hostElement.nativeElement.style.width = "" + width + "px";//  px = // transform = "translate(" + this.xOffset + "px, 0px)";
  }


}
