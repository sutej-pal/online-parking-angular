import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, Event as NavigationEvent} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title: string = '';
  routerEvents$: Subscription | undefined

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.routerEvents$
      = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.title = this.updateTitle(event.url);
          }
        });
  }

  updateTitle(url: string) {
    let urlComponents: string[] = url.split('/');
    let title: string = urlComponents.reverse()[0];
    return (title.charAt(0).toUpperCase() + title.slice(1)).replace('-',' ');
    // switch (url) {
    //   case '/dashboard': {
    //     this.title = 'Dashboard'
    //     return
    //   }
    //   case '/map': {
    //     this.title = 'Map'
    //     return
    //   }
    //   case '/parking-lots': {
    //     this.title = 'Parking Lots'
    //     return
    //   }
    //   default: {
    //     this.title = ''
    //   }
    // }
  }

  async logOut() {
    await this.router.navigate(['/login']);
  }
}
