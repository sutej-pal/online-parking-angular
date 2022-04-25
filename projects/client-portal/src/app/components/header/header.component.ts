import {Component, OnInit} from '@angular/core';
import {getSearchData} from "../../store/search/search.selectors";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getIndividual} from "../../store/individual/individual.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  individual$: Observable<any> | undefined;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.individual$ = this.store.select(getIndividual);
    // this.individual$.subscribe(e => {
    //   console.log(e);
    // })
  }

  logOut() {

  }
}
