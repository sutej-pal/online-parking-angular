import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { HomeComponent } from './screens/home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import { ProfileComponent } from './screens/profile/profile.component';
import { MapComponent } from './screens/map/map.component';
import { ParkingLotsComponent } from './screens/parking-lots/parking-lots.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
    MapComponent,
    ParkingLotsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatLineModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
