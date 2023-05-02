import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CharacterService } from '../character/character.service';
import { MomentService } from '../moment/moment.service';
import { TimelineDateService } from '../timeline/timeline-date.service';
import { TimelineService } from '../timeline/timeline.service';
@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss'],
})
export class TimelinePageComponent implements OnInit {
  moments: any;

  count: any;

  startDate = new FormControl(new Date());

  endDate = new FormControl(new Date());

  constructor(
    public momentStoreService: MomentService,
    public timelineService: TimelineService,
    public timelineDateService: TimelineDateService,
    public characterService: CharacterService
  ) {
    this.timelineDateService.datesChanged$.subscribe(
      this._onDateChanged.bind(this)
    );
  }

  ngOnInit() {
    /*
     * Call this from a component because the timelineDataService constructor is called before
     * the classes are. (I think) If you don't set the default date from a component,
     * the formControl dates aren't updated. I could make a function on timelineDataService
     * called resetDates() { this._datesChanged$.next() }, but that feels icky.'
     */
    this.setDateRangeDefault();
  }

  private _onDateChanged() {
    this.startDate.setValue(new Date(this.timelineDateService.getStart()));
    this.endDate.setValue(new Date(this.timelineDateService.getEnd()));
  }

  setDateRange() {
    this.timelineDateService.setDateRange(
      this.startDate.value,
      this.endDate.value
    );
  }

  setDateRangeDefault() {
    this.timelineDateService.setDateRange(
      this.timelineDateService.defaultStartTimestamp,
      this.timelineDateService.defaultEndTimestamp
    );
  }

  redrawCanvas() {
    this.timelineService.redrawCanvas();
  }
}
