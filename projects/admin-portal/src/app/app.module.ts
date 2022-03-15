import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './screens/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './screens/dashboard/dashboard.component';
import {HomeComponent} from './screens/home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolbarComponent} from './Components/toolbar/toolbar.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {ProfileComponent} from './screens/profile/profile.component';
import {MapComponent} from './screens/map/map.component';
import {ParkingLotsComponent} from './screens/parking-lots/parking-lots.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EditParkingLotComponent} from './screens/edit-parking-lot/edit-parking-lot.component';
import {ClientsComponent} from './screens/clients/clients.component';
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationSuccessComponent} from './Components/notification/notification-success/notification-success.component';
import {ToastrModule} from "ngx-toastr";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
    MapComponent,
    ParkingLotsComponent,
    EditParkingLotComponent,
    ClientsComponent,
    NotificationSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatTooltipModule,
    MatTableModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatGridListModule,
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
