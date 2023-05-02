import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { CharacterCreateComponent } from './character/character-create/character-create.component';
import { CharacterHousesComponent } from './character/character-houses/character-houses.component';
import { CharacterComponent } from './character/character.component';
import { HouseComponent } from './house/house.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { HousesComponent } from './houses/houses.component';
import { MomentCreateComponent } from './moment/moment-create/moment-create.component';
import { MomentComponent } from './moment/moment.component';
import { NsEventComponent } from './ns-event/ns-event.component';
import { FilterComponent } from './timeline/filter/filter.component';
import { MomentSpotComponent } from './timeline/moment-spot/moment-spot.component';
import { MonthLabelComponent } from './timeline/month-label/month-label.component';
import { MonthlineComponent } from './timeline/monthline/monthline.component';
import { RowComponent } from './timeline/row/row.component';
import { RowLabelComponent } from './timeline/row-label/row-label.component';
import { RowLabelContainerComponent } from './timeline/row-label-container/row-label-container.component';
import { TimelineChildDirective } from './timeline/timeline-child.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { YearLabelComponent } from './timeline/year-label/year-label.component';
import { YearlineComponent } from './timeline/yearline/yearline.component';
import { CharacterListComponent } from './moment/character-list/character-list.component';
import { CharacterSelectAutocompleteComponent } from './character/character-select-autocomplete/character-select-autocomplete.component';

//import { MatSlideToggleModule } from "@angular/material/slide-toggle";

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
    HouseCreateComponent,
    HouseComponent,
    HousesComponent,
    CharacterHousesComponent,
    FilterComponent,
    CharacterListComponent,
    CharacterSelectAutocompleteComponent,
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
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
