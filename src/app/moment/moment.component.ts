import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NSMoment } from '../_library';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnChanges {
  @Input() moment!: NSMoment;

  public currentMoment!: NSMoment;

  public selectedDate: any;

  date = new FormControl(new Date());

  name = new FormControl('');

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const x = changes['moment'].currentValue;
    this.currentMoment = Object.assign({}, x);
    this.setFormDate(this.currentMoment.timestamp);
    this.setFormName(this.currentMoment.name);
  }

  debug() {
    console.log(this.selectedDate);
  }

  setFormDate(timestamp: number) {
    const newDate = new Date(timestamp);
    this.date = new FormControl(newDate);
  }

  setFormName(name: string) {
    this.name = new FormControl(name);
  }
}
