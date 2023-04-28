import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { House } from '../house.interface';

import { HouseService } from '../house.service';

@Component({
  selector: 'app-character-houses',
  templateUrl: './character-houses.component.html',
  styleUrls: ['./character-houses.component.scss'],
})
export class CharacterHousesComponent implements OnInit, OnChanges {
  @Input() houseIds?: string[];

  myControl = new FormControl(null);

  allHouses: House[] = [];

  characterHouses: House[] = [];
  characterHouse$: BehaviorSubject<House[]> = new BehaviorSubject<House[]>([]);

  filteredOptions?: Observable<House[]>;

  constructor(private houseService: HouseService) {
    this.houseService.house$.subscribe((houses: House[]) => {
      this.allHouses = houses;
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log('map', value);
        return this._filter(value);
      })
    );

    //this.myControl.
  }

  ngOnChanges(changes: SimpleChanges) {
    const houseIds: string[] = changes['houseIds'].currentValue;
    if (houseIds) {
      houseIds.forEach((id: string) => {
        const house: House | undefined = this.houseService.getHouseFromId(id);
        if (house)
          this.allHouses.push(house);
      })
    }
  }

  // value is what is entered into the textbox???
  private _filter(value: string): House[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.allHouses.filter(option => {
      //console.log(option)
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  getOptionText(option: House) {
    if (option) {
      return option.name;
    }
    return '';
  }

  addHouse(house: House) {
    console.log(this.myControl);
    //this.houseService.getHouse();
    //let x = this.myControl.value;
    console.log('add');
    //this.houseService.createFromName(x);
  }
  getPosts(s: any) {
    console.log('::::::')
  }
  getSelectedCountry(y: any) {
    const id: string = this.myControl.value
    const house = this.houseService.getHouseFromId(id);
    if (house && !this.has(house)) {
      this.characterHouses.push(house);
    }
  }

  private has(house: House): House | undefined {
    return this.characterHouses.find((h: House) => {
      house.id === h.id;
    })
  }
}
