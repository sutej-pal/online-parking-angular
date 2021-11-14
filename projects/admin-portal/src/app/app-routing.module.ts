import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./screens/login/login.component";
import {DashboardComponent} from "./screens/dashboard/dashboard.component";
import {HomeComponent} from "./screens/home/home.component";
import {ProfileComponent} from "./screens/profile/profile.component";
import {MapComponent} from "./screens/map/map.component";
import {ParkingLotsComponent} from "./screens/parking-lots/parking-lots.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "map",
        component: MapComponent
      },
      {
        path: "parking-lots",
        component: ParkingLotsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
