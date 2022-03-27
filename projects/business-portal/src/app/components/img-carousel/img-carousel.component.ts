import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})
export class ImgCarouselComponent implements OnInit {

  @Input() images: string[] | any = [];
  @ViewChild('slides') slides: any;
  carouselId: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.carouselId = this.generateHTMLId();
  }

  generateHTMLId(length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length - 1 ; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    result = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 10)) + result;
    return result
  }
}
