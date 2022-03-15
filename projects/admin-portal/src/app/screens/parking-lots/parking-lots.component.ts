import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ParkingLotService} from "../../services/parking-lot.service";

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lots.component.html',
  styleUrls: ['./parking-lots.component.scss']
})
export class ParkingLotsComponent implements OnInit {

  constructor(
    private router: Router,
    private parkingLotService: ParkingLotService
  ) {
  }

  async ngOnInit() {
    await this.getParkingLotList();
  }

  async addParkingLot() {
    await this.router.navigate(['parking-lot', 'add'])
  }

  private async getParkingLotList() {
    await this.parkingLotService.getList();
  }
}
