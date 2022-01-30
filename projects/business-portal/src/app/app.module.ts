import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './screens/home/home.component';
import {RegisterComponent} from "./screens/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskModule, IConfig} from 'ngx-mask'
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ToastrModule} from "ngx-toastr";
import {LoginComponent} from './screens/login/login.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {ParkingLotComponent} from './screens/parking-lot/parking-lot.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {ParkingLotCardComponent} from './components/parking-lot-card/parking-lot-card.component';
import {EditParkingLotComponent} from './screens/edit-parking-lot/edit-parking-lot.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent,
    ParkingLotComponent,
    ParkingLotCardComponent,
    EditParkingLotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule
  ],
  providers: [],
  exports: [ToolbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
