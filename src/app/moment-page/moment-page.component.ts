import { Component, OnInit } from '@angular/core';

import { MomentService } from '../moment/moment.service';

@Component({
  selector: 'app-moment-page',
  templateUrl: './moment-page.component.html',
  styleUrls: ['./moment-page.component.scss'],
})
export class MomentPageComponent implements OnInit {
  constructor(public momentService: MomentService) {}

  ngOnInit(): void {}
}
