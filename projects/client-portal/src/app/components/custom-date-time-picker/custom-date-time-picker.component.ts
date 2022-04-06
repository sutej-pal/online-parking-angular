import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-custom-date-time-picker',
  templateUrl: './custom-date-time-picker.component.html',
  styleUrls: ['./custom-date-time-picker.component.scss']
})
export class CustomDateTimePickerComponent implements OnInit {

  @Input() public formGroup: FormGroup = new FormGroup({});
  @Input() public controlName: string = '';
  isTimeVisible = false;
  startDate: string = '';
  startTime: string = '';
  formControl = new FormControl('')

  constructor() {
  }

  ngOnInit(): void {
    // const date = moment().add(1, 'days').startOf('day');
    this.formControl = this.formGroup.controls[this.controlName] as FormControl;
    console.log('this.formControl', this.formControl);
    const dateTime = this.formControl.value;
    this.startDate = moment(dateTime).format('ddd Do MMM');
    this.startTime = moment(dateTime).format('hh:mm a');

    // this.formControl.setValue(date);
    // if (this.controlName.toLowerCase().includes('arrival')) {
    //   this.handleTimePicker('10:00 am');
    // } else {
    //   this.handleTimePicker('12:00 am');
    // }
  }

  handleTimePicker(time: string) {
    this.isTimeVisible = false;
    let date = moment(this.formControl.value).startOf('day').format('L');
    date = date.toString();
    console.log(date)
    const dateTime = moment(date + ' ' + time).format();
    console.log(dateTime);
    this.formControl.setValue(dateTime);
    this.startDate = moment(dateTime).format('ddd Do MMM');
    this.startTime = moment(dateTime).format('hh:mm a');
    if (this.controlName.includes('arrival')) {
      this.formGroup.controls['arrivalDateTime'].updateValueAndValidity();
    } else {
      this.formGroup.controls['exitDateTime'].updateValueAndValidity();
    }
  }

  setEventListener(e: any) {
    let t = document.querySelector('.mat-calendar-content');
    if (t) {
      t.addEventListener('click', (d: any) => {
        if (d.target.classList.contains('mat-calendar-body-cell-content') && d.target.innerText < 32) {
          this.isTimeVisible = true
        }
      })
    }
  }

}
