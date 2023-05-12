import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CharacterClass } from './character';
import { CharacterService } from './character.service';
import { HouseService } from './house.service';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnChanges {
  @Input() character!: CharacterClass;

  private houseIdsFromChild: string[] = [];

  sigils: sigilData[] = [];

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]), // add updateOn: 'blur'
    lastName: new FormControl(''),
    nickName: new FormControl(''),
    isPov: new FormControl(false),
    //houses: new FormControl([]),
    //houses: this.fb.array([]),
  });

  constructor(
    public characterService: CharacterService,
    public bookService: BookService,
    public houseService: HouseService,
    private fb: FormBuilder
  ) {
    houseService.house$.subscribe(() => {
      if (this.character?.allegiances) {
        this.updateSigils(this.character.allegiances);
      }
    });
  }

  private updateSigils(allegiances: string[]) {
    allegiances.forEach((houseId: string) => {
      const h = this.houseService.getHouseFromId(houseId);
      if (h?.sigilURL) {
        const s: sigilData = {
          url: h.sigilURL,
          tooltipText: h.nameFull,
        };
        this.sigils.push(s);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const character: CharacterClass = changes['character'].currentValue;
    if (character) {
      if (character.allegiances) {
        this.updateSigils(character.allegiances);
      }
      //console.log(character);
      //this.updateForm.controls['name'].setValue(character.name);
      //this.updateForm.controls['nameUnique'].setValue(character.nameUnique);
      //this.updateForm.controls['nickName'].setValue(character.nickName);
      //this.updateForm.controls['isPov'].setValue(character.isPov);
      //this.updateForm.controls['houses'].setValue(character.houses);
      //this.updateForm.controls['houses'].setValue(['stark', 'lannister', 'baratheon', 'snow']);
      this.updateForm.markAsPristine();
    }
  }

  onUpdate() {
    this.characterService.scrapeFromWeb(this.character.id);
    //console.log(this.updateForm);
    //const c = this.updateForm.value;
    /*const updatedCharacter: CharacterData = {
      id: this.character.id,
      name: c.name,
      lastName: c.lastName,
      nickName: c.nickName,
      isPov: c.isPov,
      houses: this.houseIdsFromChild,
    };
    this.characterService.update(updatedCharacter);*/
  }

  onDelete() {
    debugger;
    //this.characterService.delete(this.character.id);
  }

  get firstName() {
    return this.updateForm.controls['firstName'];
  }

  get lastName() {
    return this.updateForm.controls['lastName'];
  }

  /*
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
    this.updateForm.markAsDirty ();

  }


  deleteHouse(houseIndex: number) {
    this.houses.removeAt(houseIndex);
  }
  */

  // called from child element
  onHouseIdsChanged(ids: string[]) {
    this.houseIdsFromChild = ids;
    this.updateForm.markAsDirty();
  }
}

interface sigilData {
  url: string;
  tooltipText: string;
}
