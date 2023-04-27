import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CharacterService } from './character.service';
import { CharacterClass, CharacterData } from './character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnChanges {
  @Input() character!: CharacterClass;

  public updateForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]), // add updateOn: 'blur'
    lastName: new FormControl(''),
    nickName: new FormControl(''),
    isPov: new FormControl(false),
    //houses: new FormControl([]),
    houses: this.fb.array([]),
  });

  constructor(
    private characterService: CharacterService,
    private fb: FormBuilder
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const character: CharacterClass = changes['character'].currentValue;
    if (character) {
      //console.log(character);
      this.updateForm.controls['firstName'].setValue(character.firstName);
      this.updateForm.controls['lastName'].setValue(character.lastName);
      this.updateForm.controls['nickName'].setValue(character.nickName);
      this.updateForm.controls['isPov'].setValue(character.isPov);
      this.updateForm.controls['houses'].setValue(character.houses);
      //this.updateForm.controls['houses'].setValue(['stark', 'lannister', 'baratheon', 'snow']);
      this.updateForm.markAsPristine();
    }
  }

  public onUpdate() {
    console.log(this.updateForm);
    const c = this.updateForm.value;
    const updatedCharacter: CharacterData = {
      id: this.character.id,
      firstName: c.firstName,
      lastName: c.lastName,
      nickName: c.nickName,
      isPov: c.isPov,
      houses: c.houses,
    };
    this.characterService.update(updatedCharacter);
  }

  public onDelete() {
    this.characterService.delete(this.character.id);
  }

  get firstName() {
    return this.updateForm.controls['firstName'];
  }

  get lastName() {
    return this.updateForm.controls['lastName'];
  }

  get houses() {
    return this.updateForm.controls['houses'] as FormArray;
    //console.log(this.updateForm.controls['houses']);
    //return this.updateForm.controls['houses'];
  }

  addHouse() {
    console.log('addHouse');
    const houseForm = this.fb.group({
      houseName: ['', Validators.required],
      //level: ['beginner', Validators.required]
    });
    this.houses.push(houseForm);
  }

  deleteHouse(houseIndex: number) {
    this.houses.removeAt(houseIndex);
  }
}
