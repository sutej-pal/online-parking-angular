import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./screens/search/search.component";
import {HomeComponent} from "./screens/home/home.component";
import {SignUpComponent} from "./screens/sign-up/sign-up.component";
import {LoginComponent} from "./screens/login/login.component";
import {TermAndConditionsComponent} from "./screens/term-and-conditions/term-and-conditions.component";
import {ForgotPasswordComponent} from "./screens/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./screens/reset-password/reset-password.component";
import {CheckoutComponent} from "./screens/checkout/checkout.component";
import {IndividualComponent} from "./screens/individual/individual.component";
import {ProfileComponent} from "./screens/individual/profile/profile.component";
import {BookingsComponent} from "./screens/individual/bookings/bookings.component";
import {NotFoundComponent} from "./screens/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'sign-up/:userType',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'individual',
    component: IndividualComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'bookings',
        component: BookingsComponent
      },
      {
        path: 'payments',
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:userId/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermAndConditionsComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
