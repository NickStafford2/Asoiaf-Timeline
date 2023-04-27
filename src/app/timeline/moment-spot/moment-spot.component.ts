import { Component, Input } from '@angular/core';

import { TimelineMoment } from '../../_library';

@Component({
  selector: 'app-moment-spot',
  templateUrl: './moment-spot.component.html',
  styleUrls: ['./moment-spot.component.scss'],
})
export class MomentSpotComponent /*implements OnChanges*/ {
  @Input() moment!: TimelineMoment;

  public name: string = 'test';

  /*
  ngOnChanges(changes: SimpleChanges): void {
    changes
    debugger; 
  }
  */
  /*
  ngOnInit(): void {
    //console.log(this.xOffset)
  }-*
/*
  ngOnChanges(changes: SimpleChanges) {

    console.log(changes);
    const moment: Moment = changes['moment'].currentValue;
    this.timestamp = moment.timestamp;
    this.setXOffset(this.timestamp)

  }

  private setXOffset(timestamp: number) {
    this.xOffset = this.timelineService.getPixelsForTimestamp(timestamp);
    this.setPosition(this.xOffset);
  }
*/

  /*public setPosition(x: number) {
    const y = this.hostElement.nativeElement.style;
    this.hostElement.nativeElement.style.transform = "translate(" + x + "px, 0px)";
  }
  */
}
