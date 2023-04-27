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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
import { NsEventComponent } from './ns-event/ns-event.component';
import { BookComponent } from './book/book.component';
import { CharacterComponent } from './character/character.component';
import { MatButtonModule } from '@angular/material/button';
//import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CharacterCreateComponent } from './character/character-create/character-create.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

//testing again
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
    RowLabelContainerComponent,
    NsEventComponent,
    BookComponent,
    CharacterComponent,
    CharacterCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
