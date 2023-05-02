import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HouseService } from '../character/house.service';

import { NSMoment } from './moment.interface';
import { MomentService } from './moment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnChanges {
  @Input() moment!: NSMoment;

  currentMoment!: NSMoment;

  selectedDate: any;

  date = new FormControl(new Date());

  name = new FormControl('');

  constructor(private momentService: MomentService, private h: HouseService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const x = changes['moment'].currentValue;
    this.currentMoment = Object.assign({}, x);
    this.setFormDate(this.currentMoment.timestamp);
    this.setFormName(this.currentMoment.name);
  }

  save() {
    if (this.moment?.id) {
      const name = this.name.value;
      const date: Date = this.date.value;
      const newMoment: NSMoment = {
        id: this.moment.id,
        characters: ['64472995d02d8d11904786fb'],
        name,
        timestamp: date.valueOf(),
      };
      this.momentService.update(newMoment);
      console.log(this.selectedDate);
    }
  }

  setFormDate(timestamp: number) {
    const newDate = new Date(timestamp);
    this.date = new FormControl(newDate);
  }

  setFormName(name: string) {
    this.name = new FormControl(name);
  }
}
