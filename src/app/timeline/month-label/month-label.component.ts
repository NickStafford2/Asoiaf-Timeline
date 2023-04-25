import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-label',
  templateUrl: './month-label.component.html',
  styleUrls: ['./month-label.component.scss']
})
export class MonthLabelComponent implements OnInit, OnChanges {
  @Input() label: string = 'month here';


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    /*
    if (changes['timestamp']) {
      const ts: number = changes['timestamp'].currentValue;
      const m: moment.Moment = moment(ts);
      this.label = m.format('MMM');
    }
    */
  }

}
