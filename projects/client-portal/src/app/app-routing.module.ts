import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./screens/search/search.component";
import {HomeComponent} from "./screens/home/home.component";
import {SignUpComponent} from "./screens/sign-up/sign-up.component";
import {LoginComponent} from "./screens/login/login.component";
import {TermAndConditionsComponent} from "./screens/term-and-conditions/term-and-conditions.component";
import {BookingsComponent} from "./screens/bookings/bookings.component";

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
    path: 'bookings',
    component: BookingsComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermAndConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
