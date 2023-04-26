import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineRow, XYOffset } from '../../_library';
import { TimeLabelService } from '../time-label.service';

@Injectable({
  providedIn: 'root',
})
export class RowService {
  private _row$: BehaviorSubject<Array<TimelineRow>> = new BehaviorSubject<
    Array<TimelineRow>
  >([]);
  public readonly row$: Observable<Array<TimelineRow>> =
    this._row$.asObservable();

  public readonly defaultHeight: number = 80;
  public readonly xOffset: number = 0;

  constructor(private _timeLabelService: TimeLabelService) {
    this._addRow();
    this._addRow();
    this._addRow();
    this._addRow();
  }

  private _addRow() {
    const yOffset: number = this._getHeight();
    const xyOffset: XYOffset = { xOffset: this.xOffset, yOffset };

    const newRow: TimelineRow = {
      height$: new BehaviorSubject<number>(this.defaultHeight),
      xyOffset$: new BehaviorSubject<XYOffset>(xyOffset),
    };

    const rows: Array<TimelineRow> = this._row$.getValue();
    rows.push(newRow);
    this._row$.next(rows);
  }

  private _getHeight(): number {
    let total: number = 0;
    total += this._timeLabelService.getTimeLabelRowHeight(); // rows are below the time Label rows.
    this._row$.getValue().forEach((row: TimelineRow) => {
      total += row.height$.getValue();
    });
    return total;
  }
}
