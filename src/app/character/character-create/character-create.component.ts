import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { CharacterService } from '../character.service';
import { CharacterHttpService } from '../character-http.service';
import { CharacterCreateData } from '../character';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss'],
})
export class CharacterCreateComponent {
  public createForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]), // add updateOn: 'blur'
    lastName: new FormControl('', [Validators.required]),
    nickName: new FormControl(''),
    isPov: new FormControl(false, [Validators.required]),
    houses: new FormControl([]),
  });

  constructor(public characterService: CharacterService) {}

  public onCreate() {
    console.log(this.createForm);
    const f = this.createForm.value;
    const newCharacter: CharacterCreateData = {
      firstName: f.firstName,
      lastName: f.lastName,
      nickName: f.nickName,
      isPov: f.isPov,
      houses: f.houses,
    };
    this.characterService.create(newCharacter);
  }

  get firstName() {
    return this.createForm.controls['firstName'];
  }

  get lastName() {
    return this.createForm.controls['lastName'];
  }
}
