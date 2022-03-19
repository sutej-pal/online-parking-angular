import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {BehaviorSubject} from "rxjs";
import {ParkingLotService} from "../../services/parking-lot.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {ParkingLot} from "../../store/parking-lot/parking-lot.reducer";

@Component({
  selector: 'app-parking-lot-card',
  templateUrl: './parking-lot-card.component.html',
  styleUrls: ['./parking-lot-card.component.scss']
})
export class ParkingLotCardComponent implements OnInit {

  @Input() parkingLot: ParkingLot | undefined;

  constructor(
    public dialog: MatDialog,
    private parkingLotService: ParkingLotService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  async showDeleteConfirmationDialog(parkingLot: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '70vh',
      data: {name: 'name', animal: 'animal'}
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      try {
        const res = await this.parkingLotService.delete(parkingLot.id);
        this.notificationService.showSuccess(res.message);
      } catch (e) {
        this.notificationService.showError("Failed to delete parking lot.");
      }
    }

  }
}
