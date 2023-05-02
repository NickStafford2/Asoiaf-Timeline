import { Component } from '@angular/core';

import { HouseService } from '../character/house.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent {
  constructor(public houseService: HouseService) {}
}
