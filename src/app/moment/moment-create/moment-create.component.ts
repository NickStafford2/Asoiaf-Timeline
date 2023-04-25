import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NSMoment } from '../../_library';
import { MomentHttpService } from '../moment-http.service';

@Component({
  selector: 'app-moment-create',
  templateUrl: './moment-create.component.html',
  styleUrls: ['./moment-create.component.scss']
})
export class MomentCreateComponent implements OnInit {

 // date = new FormControl(new Date());
  //name = new FormControl('');

  momentForm = new FormGroup({
    momentName: new FormControl(''),
    timestamp: new FormControl(0),
  })

  constructor(private momentService: MomentHttpService) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    //console.warn(this.momentForm.value);
    const ts: Date = this.momentForm.value['timestamp'];
    const y = ts.getTime();
    const newMoment: NSMoment  = {
      id: 'new',
      name: this.momentForm.value['momentName'],
      timestamp: ts.getTime()
    }
    this.momentService.create(newMoment);
  }
}
