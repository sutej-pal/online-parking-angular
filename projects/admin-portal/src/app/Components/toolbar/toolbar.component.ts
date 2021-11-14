import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    switch (url) {
      case '/dashboard': this.title = 'Dashboard'
    }
  }

}
