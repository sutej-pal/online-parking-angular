import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./screens/login/login.component";
import {DashboardComponent} from "./screens/dashboard/dashboard.component";
import {HomeComponent} from "./screens/home/home.component";
import {VehiclesComponent} from "./screens/vehicles/vehicles.component";
import {MapComponent} from "./screens/map/map.component";
import {ParkingLotsComponent} from "./screens/parking-lots/parking-lots.component";
import {EditParkingLotComponent} from "./screens/edit-parking-lot/edit-parking-lot.component";
import {ClientsComponent} from "./screens/clients/clients.component";

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
        path: "vehicles",
        component: VehiclesComponent
      },
      {
        path: "map",
        component: MapComponent
      },
      {
        path: "clients",
        component: ClientsComponent
      },
      {
        path: "parking-lot",
        component: ParkingLotsComponent
      },
      {
        path: "parking-lot/add",
        component: EditParkingLotComponent
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
