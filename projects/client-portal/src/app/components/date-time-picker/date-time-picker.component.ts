import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as moment from "moment";
import {resolve} from "chart.js/helpers";

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  timeSlotsArray: string[] = [];
  timeSlots: string[] = [];
  @ViewChild('selectedTime') selectedTime: ElementRef | undefined;
  @Output() timeSelected: EventEmitter<string> = new EventEmitter();
  @Output() hideTimePicker: EventEmitter<boolean> = new EventEmitter();
  @Input() time: string = '10:00 am';
  timePickerHTMLDivElement: HTMLDivElement | undefined

  constructor() {
  }

  ngOnInit(): void {
    this.generateTimeSlots();
    this.selectedTime?.nativeElement.getElementById(this.time).scrollIntoView();
  }

  generateTimeSlots() {
    const date = moment().startOf('day');
    let t = moment(date);
    while (moment(date).isSame(t, 'day')) {
      this.timeSlotsArray.push(moment(t).format('hh:mm a'));
      t = moment(t).add(15, 'minutes');
    }
  }

  handleTimePicker(time: string) {
    this.hideTimePicker.emit(true);
    this.timeSelected.emit(time);
  }

  scrollTimePicker(event: any, type: string) {
    let scrollPosition = 0;
    if (this.timePickerHTMLDivElement) {
      const scrollTop = this.timePickerHTMLDivElement.scrollTop
      scrollPosition = type === 'up' ? scrollTop - 30 : scrollTop + 30
      this.timePickerHTMLDivElement.scrollTo(0, scrollPosition)
    } else {
      this.updateTimePickerHTMLDivElement(event).then((e: any) => {
        scrollPosition = type === 'up' ? e.scrollTop - 30 : e.scrollTop + 30
        e.scrollTo(0, scrollPosition)
      })
    }
  }

  updateTimePickerHTMLDivElement(event: any) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].classList.contains('time-picker')) {
          this.timePickerHTMLDivElement = event.path[i]
          resolve(event.path[i]);
          break
        }
      }
    });
  }
}
