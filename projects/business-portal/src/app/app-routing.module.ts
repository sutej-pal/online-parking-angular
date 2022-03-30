import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./screens/home/home.component";
import {RegisterComponent} from "./screens/register/register.component";
import {LoginComponent} from "./screens/login/login.component";
import {ParkingLotComponent} from "./screens/parking-lot/parking-lot.component";
import {EditParkingLotComponent} from "./screens/edit-parking-lot/edit-parking-lot.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./screens/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'parking-lot',
        component: ParkingLotComponent
      },
      {
        path: 'parking-lot/add',
        component: EditParkingLotComponent
      },
      {
        path: 'parking-lot/edit/:parkingLotId',
        component: EditParkingLotComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
