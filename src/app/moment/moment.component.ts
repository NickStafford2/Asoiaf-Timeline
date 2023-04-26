import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MomentHttpService } from './moment-http.service';
import { FormControl } from '@angular/forms';
import { NSMoment } from '../_library';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit, OnChanges {
  @Input() moment!: NSMoment;
  public currentMoment!: NSMoment;
  public selectedDate: any;
  date = new FormControl(new Date());
  name = new FormControl('');

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const x = changes['moment'].currentValue;
    this.currentMoment = Object.assign({}, x);
    this.setFormDate(this.currentMoment.timestamp);
    this.setFormName(this.currentMoment.name);
  }

  debug() {
    const x = this.selectedDate;
    const y = 0;
  }

  setFormDate(timestamp: number) {
    const newDate = new Date(timestamp);
    this.date = new FormControl(newDate);
  }

  setFormName(name: string) {
    this.name = new FormControl(name);
  }
}
