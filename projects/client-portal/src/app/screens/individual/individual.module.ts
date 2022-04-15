import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {Router, RouterModule, Routes} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BookingsComponent} from "./bookings/bookings.component";
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'bookings',
        component: BookingsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    BookingsComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [RouterModule]
})
export class IndividualModule {
}
