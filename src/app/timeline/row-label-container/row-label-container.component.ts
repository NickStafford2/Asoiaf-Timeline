import { Component } from '@angular/core';
import { RowService } from '../row/row.service';

@Component({
  selector: 'app-row-label-container',
  templateUrl: './row-label-container.component.html',
  styleUrls: ['./row-label-container.component.scss'],
})
export class RowLabelContainerComponent {
  constructor(public rowService: RowService) {}
}
