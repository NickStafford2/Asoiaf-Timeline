import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { House } from '../house.interface';
import { HouseService } from '../house.service';

@Component({
  selector: 'app-character-houses',
  templateUrl: './character-houses.component.html',
  styleUrls: ['./character-houses.component.scss'],
})
export class CharacterHousesComponent implements OnInit, OnChanges {
  @Input() houseIds?: string[];

  @Output() changeEvent = new EventEmitter<string[]>();

  myControl = new FormControl(null);

  //allHouses: House[] = [];

  characterHouses: House[] = [];
  //characterHouse$: BehaviorSubject<House[]> = new BehaviorSubject<House[]>([]);

  filteredOptions?: Observable<House[]>;

  constructor(private houseService: HouseService) {
    this.houseService.house$.subscribe(() => {
      //this.allHouses = houses;
      this.houseIds?.forEach((id: string) => {
        this.addHouse(id);
      });
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
        this.addHouse(id);
      });
    }
  }

  // value is what is entered into the textbox???
  private _filter(value: string): House[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    const allHouses: House[] = this.houseService.getHouses();

    return allHouses.filter(option => {
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

  houseSelected(y: any) {
    const id: string = this.myControl.value;
    const house = this.houseService.getHouseFromId(id);
    if (house && !this.has(house)) {
      // todo: change thisdkasl;jdfk;lasjf
      this.characterHouses.push(house);
      this.updateParent();
    }
  }

  private has(house: House): House | undefined {
    return this.characterHouses.find((h: House) => {
      return house.id === h.id;
    });
  }

  private updateParent() {
    const ids: string[] = [];
    this.characterHouses.forEach(house => {
      ids.push(house.id);
    });
    this.changeEvent.emit(ids);
  }

  private addHouse(id: string) {
    const house: House | undefined = this.houseService.getHouseFromId(id);
    if (house) {
      const copy = Object.assign({}, house);
      this.characterHouses.push(copy);
      //this.allHouses.push(house);
    }
  }

  removeHouse(house: House) {
    console.log('dfddffffdd');
  }
}
