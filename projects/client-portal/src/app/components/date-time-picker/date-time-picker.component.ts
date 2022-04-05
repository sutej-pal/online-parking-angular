import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  // @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
  //   console.log(event);
  //   if (event.target.classList.contains('time-modal-trigger-button') || event.target.classList.contains('time')) {
  //   } else {
  //     this.hideTimePicker.emit(true);
  //   }
  // }

  timeSlotsArray: string[] = [];
  timeSlots: string[] = [];
  @ViewChild('selectedTime') selectedTime: ElementRef | undefined;
  @Output() timeSelected: EventEmitter<string> = new EventEmitter();
  @Output() hideTimePicker: EventEmitter<boolean> = new EventEmitter();
  @Input() time: string = '10:00';

  constructor() {
  }

  ngOnInit(): void {
    this.generateTimeSlots();
    this.selectedTime?.nativeElement.getElementById(this.time).scrollIntoView();
  }

  generateTimeSlots() {
    Array.from({length: 24}, (_, i) => i).map(e => {
      let t;
      e < 10 ? t = '0' + e : t = e
      this.timeSlotsArray.push(...[`${t}:00`, `${t}:15`, `${t}:30`, `${t}:45`])
    });
  }

  handleTimePicker(time: string) {
    this.hideTimePicker.emit(true);
    this.timeSelected.emit(time);
  }
}
