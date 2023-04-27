import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CharacterService } from './character/character.service';
import { MomentService } from './moment/moment.service';
import { TimelineDateService } from './timeline/timeline-date.service';
import { TimelineService } from './timeline/timeline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public moments: any;

  public count: any;

  title = 'angularapp';

  public startDate = new FormControl(new Date());

  public endDate = new FormControl(new Date());

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
    this._loadEverything();
  }

  private _onDateChanged() {
    this.startDate.setValue(new Date(this.timelineDateService.getStart()));
    this.endDate.setValue(new Date(this.timelineDateService.getEnd()));
  }

  getMoments() {
    console.log('test');
    this.momentStoreService.loadAllMoments();
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

  private _loadEverything() {
    this.momentStoreService.loadAllMoments();
  }
}
