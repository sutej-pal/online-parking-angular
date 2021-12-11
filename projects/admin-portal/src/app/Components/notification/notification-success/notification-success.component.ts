import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-success',
  templateUrl: './notification-success.component.html',
  styleUrls: ['./notification-success.component.scss']
})
export class NotificationSuccessComponent implements OnInit {

  constructor(
    @Inject('any') public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
