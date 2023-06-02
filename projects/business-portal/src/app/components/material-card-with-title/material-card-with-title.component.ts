import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-material-card-with-title',
  templateUrl: './material-card-with-title.component.html',
  styleUrls: ['./material-card-with-title.component.scss']
})
export class MaterialCardWithTitleComponent {

  @Input() title: string = '';

}
