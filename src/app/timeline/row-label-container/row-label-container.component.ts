import { Component, OnInit } from '@angular/core';
import { RowService } from '../row/row.service';

@Component({
  selector: 'app-row-label-container',
  templateUrl: './row-label-container.component.html',
  styleUrls: ['./row-label-container.component.scss'],
})
export class RowLabelContainerComponent implements OnInit {
  constructor(public rowService: RowService) {}

  ngOnInit(): void {}
}
