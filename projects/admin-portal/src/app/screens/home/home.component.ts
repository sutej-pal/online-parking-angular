import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messages = [
    {from: 's', subject: 'a', content: ''},
    {from: 's', subject: 'a', content: ''},
    {from: 's', subject: 'a', content: ''},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
