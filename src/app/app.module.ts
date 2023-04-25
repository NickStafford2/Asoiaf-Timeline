import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MomentComponent } from './moment/moment.component';
import { TimelineComponent } from './timeline/timeline.component';
import { YearlineComponent } from './timeline/yearline/yearline.component';
import { MomentSpotComponent } from './timeline/moment-spot/moment-spot.component';
import { TimelineChildDirective } from './timeline/timeline-child.directive';
import { MonthlineComponent } from './timeline/monthline/monthline.component';
import { YearLabelComponent } from './timeline/year-label/year-label.component';
import { MonthLabelComponent } from './timeline/month-label/month-label.component';
import { MomentCreateComponent } from './moment/moment-create/moment-create.component';
import { RowComponent } from './timeline/row/row.component';
import { RowLabelComponent } from './timeline/row-label/row-label.component';
import { RowLabelContainerComponent } from './timeline/row-label-container/row-label-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MomentComponent,
    TimelineComponent,
    YearlineComponent,
    MomentSpotComponent,
    TimelineChildDirective,
    MonthlineComponent,
    YearLabelComponent,
    MonthLabelComponent,
    MomentCreateComponent,
    RowComponent,
    RowLabelComponent,
    RowLabelContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
