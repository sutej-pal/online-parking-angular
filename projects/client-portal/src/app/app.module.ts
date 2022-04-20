import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchComponent} from './screens/search/search.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HomeComponent} from './screens/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';
import {CustomDateTimePickerComponent} from './components/custom-date-time-picker/custom-date-time-picker.component';
import {MatMenuModule} from "@angular/material/menu";
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./store/app.state";
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './screens/login/login.component';
import {SignUpComponent} from './screens/sign-up/sign-up.component';
import {SocialLoginModule, SocialAuthServiceConfig, SocialAuthService} from "angularx-social-login";
import {GoogleLoginProvider} from "angularx-social-login";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthTokenInterceptor} from "../../../business-portal/src/app/services/auth-token.interceptor";
import {ToastrModule} from "ngx-toastr";
import {NgxMaskModule} from "ngx-mask";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TermAndConditionsComponent} from './screens/term-and-conditions/term-and-conditions.component';
import {ForgotPasswordComponent} from './screens/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './screens/reset-password/reset-password.component';
import {metaReducers} from "./store/hydration.reducer";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ParkingLotCardComponent} from './components/parking-lot-card/parking-lot-card.component';
import {ParkingLotDetailsComponent} from './components/parking-lot-details/parking-lot-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";

const CLIENT_ID = environment.client_Id;

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBarComponent,
    HomeComponent,
    DateTimePickerComponent,
    CustomDateTimePickerComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    TermAndConditionsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ParkingLotCardComponent,
    ParkingLotDetailsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
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
        MatMenuModule,
        StoreModule.forRoot(appReducer, {metaReducers}),
        MatProgressSpinnerModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
        }),
        NgxMaskModule.forRoot(),
        MatCheckboxModule,
        FormsModule,
        MatSidenavModule,
        MatTooltipModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }, MatDatepickerModule, SocialAuthService, {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            CLIENT_ID
          )
        }
      ]
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
