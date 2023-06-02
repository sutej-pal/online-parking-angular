import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

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
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {
  FullscreenImagePreviewComponent
} from './components/fullscreen-image-preview/fullscreen-image-preview.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {metaReducers, reducers} from "./store";
import {AuthTokenInterceptor} from "./services/auth-token.interceptor";
import { LatLngPickerComponent } from './components/lat-lng-picker/lat-lng-picker.component';
import { ImgCarouselComponent } from './components/img-carousel/img-carousel.component';
import { ProfileComponent } from './screens/profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatRippleModule} from "@angular/material/core";
import { ProfileReviewComponent } from './components/profile-review/profile-review.component';
import { BookingsComponent } from './screens/bookings/bookings.component';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import { MaterialCardWithTitleComponent } from './components/material-card-with-title/material-card-with-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent,
    ParkingLotComponent,
    ParkingLotCardComponent,
    EditParkingLotComponent,
    ConfirmDialogComponent,
    FullscreenImagePreviewComponent,
    LatLngPickerComponent,
    ImgCarouselComponent,
    ProfileComponent,
    ProfileReviewComponent,
    BookingsComponent,
    MaterialCardWithTitleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatTooltipModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatTabsModule,
    MatRippleModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}],
    exports: [ToolbarComponent, ParkingLotCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
