import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { House, HouseType } from '../character/house.interface';
import { HouseService } from '../character/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnChanges {
  @Input() house?: House;

  types: Array<string> = Object.keys(HouseType).filter(key => isNaN(+key));

  selected = this.types[0];

  constructor(private houseService: HouseService) {}

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]), // add updateOn: 'blur'
    type: new FormControl(this.selected, [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const house: House = changes['house'].currentValue;
    if (house) {
      //console.log(character);
      this.updateForm.controls['name'].setValue(house.name);
      this.updateForm.controls['type'].setValue(house.type);
      this.selected = house.type;
      this.updateForm.markAsPristine();
    }
  }

  onUpdate() {
    if (this.house) {
      const h: House = {
        id: this.house?.id,
        name: this.updateForm.controls['name'].value,
        type: this.updateForm.controls['type'].value,
      };
      this.houseService.update(h);
    } else console.error('house is empty');
  }

  onDelete() {}
}
