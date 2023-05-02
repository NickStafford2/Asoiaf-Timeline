import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { XYOffset } from './timeline.interface';
import { TimelineService } from './timeline.service';

@Directive({
  selector: '[appTimelineChild]',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineChildDirective implements OnInit {
  // @Input() startTime: number = 0;
  // @Input() duration: number = 0;
  //@Input() child?: TimelineChild;

  // @Input() xOffset: number = 0;
  // @Input() width: number = 0;

  @Input() xyOffset$?: BehaviorSubject<XYOffset>;

  @Input() width$?: BehaviorSubject<number>;

  @Input() height$?: BehaviorSubject<number>;

  /*  @Input() set xOffset(xOffset: number | null) {
    console.log('set xOffset', xOffset);
    if (xOffset)
      this._setXOffset(xOffset);
  }

  @Input() set width(width: number | null) {
    console.log('set width', width);
    if (width)
      this._setWidth(width);
  }
  */

  /*
  private _onChange$: Subject<void> = new Subject<void>();
  public readonly onChange$: Observable<void> = this._onChange$.asObservable();
  */
  constructor(
    private hostElement: ElementRef,
    private timelineService: TimelineService
  ) {
    //timelineService.redraw$.subscribe(() => {
    //console.log('redraw called');
    //console.log(this.xOffset, this.width, hostElement)
    /*
      if (this.child?.xOffset) {
        this._setXOffset(this.child?.xOffset);
      }
      if (this.child?.width) {
        this.setWidth(this.child.width)
      }
      */
    /*      if (this.xOffset) {
        this._setXOffset(this.xOffset);
      }
      if (this.width) {
        this._setWidth(this.width)
      }
      */
    //})
  }

  ngOnInit() {
    this.xyOffset$?.subscribe((offset: XYOffset) => {
      if (offset) {
        console.log(offset.yOffset);
        this._setXYOffset(offset.xOffset, offset.yOffset);
      }
    });
    this.width$?.subscribe(x => {
      if (x) this._setWidth(x);
    });
    this.height$?.subscribe(x => {
      if (x) this._setHeight(x);
    });
  }

  // todo: use this syntax
  //ngOnChanges({ name, email }: SimpleChanges) {
  //ngOnChanges(changes: SimpleChanges): void {
  // not sure if this is needed?
  /*
    const child: TimelineChild = changes['child'].currentValue;
    if (child) {
      this._setXOffset(child.xOffset);
      this.setWidth(child.width);
    }
    */
  /*
    const xOffset: number = changes['xOffset'].currentValue;
    console.log('ngOnChanges', changes);

    if (xOffset) {
      this._setXOffset(xOffset);
    }
    const width: number = changes['width'].currentValue;
    if (width) {
      this._setWidth(width);
    }
    */
  //}

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

  private _setXYOffset(x: number, y: number) {
    const s = 'translate(' + x + 'px, ' + y + 'px)';
    this.hostElement.nativeElement.style.transform = s;
    //this.hostElement.nativeElement.style.transform = "translateX(100px)";
    //this.hostElement.nativeElement.style.transform = "translate(" + x + "px " + y + "px)";
  }

  /*
  private _setXOffset(x: number) {
    this.hostElement.nativeElement.style.transform = "translate-x(" + x + "px)";
  }

  private _setYOffset(y: number) {
    this.hostElement.nativeElement.style.transform = "translate-y(" + y + "px)";
  }
  */
  private _setWidth(width: number) {
    this.hostElement.nativeElement.style.width = '' + width + 'px'; //  px = // transform = "translate(" + this.xOffset + "px, 0px)";
  }

  private _setHeight(height: number) {
    this.hostElement.nativeElement.style.height = '' + height + 'px'; //  px = // transform = "translate(" + this.xOffset + "px, 0px)";
  }
}
