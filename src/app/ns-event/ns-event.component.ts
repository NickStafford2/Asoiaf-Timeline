import { Component, Input } from '@angular/core';
import { NSEvent } from '../_library';

@Component({
  selector: 'app-ns-event',
  templateUrl: './ns-event.component.html',
  styleUrls: ['./ns-event.component.scss'],
})
export class NsEventComponent {
  @Input() nsEvent?: NSEvent;
}
