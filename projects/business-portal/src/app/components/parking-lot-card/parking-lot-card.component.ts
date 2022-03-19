import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {BehaviorSubject} from "rxjs";

interface ParkingLot {
  name?: string
}

@Component({
  selector: 'app-parking-lot-card',
  templateUrl: './parking-lot-card.component.html',
  styleUrls: ['./parking-lot-card.component.scss']
})
export class ParkingLotCardComponent implements OnInit {

  @Input() parkingLot: ParkingLot = {};

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showDeleteConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {name: 'name', animal: 'animal'}
    });
  }
}
