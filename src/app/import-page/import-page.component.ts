import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Papa, ParseMeta, ParseResult } from 'ngx-papaparse';
import { NSMoment, NSMomentData } from '../moment/moment.interface';

@Component({
  selector: 'app-import-page',
  templateUrl: './import-page.component.html',
  styleUrls: ['./import-page.component.scss'],
})
export class ImportPageComponent {
  fileName = '';

  records = [];

  constructor(private http: HttpClient, private papa: Papa) {
    const csvData = '"Hello","World!"';

    this.papa.parse(csvData, {
      complete: result => {
        console.log('Parsed: ', result);
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      //const formData = new FormData();
      //formData.append('thumbnail', file);
      //const upload$ = this.http.post('/api/thumbnail-upload', formData);
      //upload$.subscribe();

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        //console.log(reader.result);
        const csvData = reader.result as string;
        if (csvData) {
          this.papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (result: ParseResult) => {
              console.log('Parsed ', result);
              this.readData(result);
            },
          });
        }
      };
      /*let count = 0;
      Papa.parse(file, {
        worker: true, // Don't bog down the main thread if its a big file
        step: function (result: any) {
          console.log(result);
          count++;
          // do stuff with result
        },
        complete: function (results: any, file: any) {
          console.log('parsing complete read', count, 'records.');
        },
      });
      */
      /*reader.readAsText(file);
      const b = reader.result;
      console.log(b);

      reader.onload = function () {
        console.log(reader.result);
        //Papa.

      };

      reader.onerror = function () {
        console.log(reader.error);
      };
      */
      //const a = readFile(file);

      //const a = Buffer.from(file);
      /*parse(
        a,
        {
          comment: '#',
        },
        function (err, records) {
          assert.deepStrictEqual(records, [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
          ]);
        }
      );
      */
    }
  }

  private readData(results: ParseResult) {
    const invalidRows = [];
    const moments = [];

    for (let i = 0; i < 60; i++) {
      const row = results.data[i];
      if (this.isRowValid(row)) {
        const dateString = '' + row.M + '-' + row.D + '-' + row.Y;
        const date = moment(dateString);
        const newMoment: NSMomentData = {
          name: row.Event,
          characters: [],
          timestamp: date.valueOf(),
        };
        moments.push(newMoment);
      } else {
        invalidRows.push(row);
      }
    }
    console.log(invalidRows);
    console.log(moments);
    /*
    data.forEach(row => {
     })
     */
  }

  private isRowValid(row: any): boolean {
    /*
    let filled = 0;
    meta.fields.forEach((fieldName: string) => {
      console.log(row[fieldName]);
      if (row[fieldName]) {
        filled++;
      }
    });
    if (filled < 2) {
      return false;
    }*/
    const requiredFields = ['Y', 'M', 'D', 'Event'];
    let hasAllRequired = true;
    requiredFields.forEach(field => {
      if (!row[field]) {
        hasAllRequired = false;
      }
    });
    return hasAllRequired;
  }
}
