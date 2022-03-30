import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-review',
  templateUrl: './profile-review.component.html',
  styleUrls: ['./profile-review.component.scss']
})
export class ProfileReviewComponent implements OnInit {
  reviews: any = [0, 1, 2, 3, 4, 5, 6];

  // reviews: any = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
