import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { House } from '../character/house.interface';
import { HouseService } from '../character/house.service';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.scss'],
})
export class HouseCreateComponent implements OnInit {
  myControl = new FormControl(null);
  options: House[] = [];
  filteredOptions?: Observable<House[]>;

  constructor(private houseService: HouseService) {
    this.houseService.house$.subscribe((houses: House[]) => {
      this.options = houses;
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        //console.log(value)
        return this._filter(value || '')
      }),
    );
  }

  // value is what is entered into the textbox???
  private _filter(value: string): House[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => {
      //console.log(option)
      return option.name.toLowerCase().includes(filterValue)
    });
  }

  getOptionText(option: House) {
    if (option)
      return option.name;
    return '';
  }

  createHouse() {
    let x = this.myControl.value
    console.log('created');
    this.houseService.createFromName(x);
  }
}

/*  myControl = new FormControl('');

  options: House[] = [];

  filteredOptions?: Observable<House[]>;

  constructor(private houseService: HouseService) {
    this.houseService.house$.subscribe((houses: House[]) => {
      this.options = houses;
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      //startWith(''),
      map((value) => {

        console.log(value);
        console.log('test2');
        this.filter(value || '');
      })
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return ['test', 'wtf', 'other'];
    
    return this.options.filter(option => }
      option.toLowerCase().includes(filterValue)
    );
  }
}
*/
