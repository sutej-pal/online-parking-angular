import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './screens/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './screens/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { CustomDateTimePickerComponent } from './components/custom-date-time-picker/custom-date-time-picker.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBarComponent,
    HomeComponent,
    DateTimePickerComponent,
    CustomDateTimePickerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatRippleModule,
        MatMenuModule
    ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
