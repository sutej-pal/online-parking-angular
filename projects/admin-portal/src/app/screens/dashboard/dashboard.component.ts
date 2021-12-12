import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';
import {getRelativePosition} from "chart.js/helpers";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ts-ignore
  @ViewChild('myChart1', {static: true}) myChart1: ElementRef;
  // @ts-ignore
  @ViewChild('myChart2', {static: true}) myChart2: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    console.log(Chart);
    this.createChart1();
    this.createChart2();
  }

  createChart1() {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Users Registered',
        backgroundColor: 'rgb(255,134,161)',
        borderColor: 'rgb(255,134,161)',
        data: [0, 10, 5, 2, 20, 30, 45].sort( () => Math.random() - 0.5)
      },{
        label: 'Bookings',
        backgroundColor: 'rgb(128,128,255)',
        borderColor: 'rgb(128,128,255)',
        data: [0, 10, 5, 2, 20, 30, 45].sort( () => Math.random() - 0.5)
      }]
    };

    const chart = new Chart(this.myChart1.nativeElement, {
      type: 'line',
      data: data,
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
      }
    });
  }

  createChart2 () {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100].sort( () => Math.random() - 0.5),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    const chart = new Chart(this.myChart2.nativeElement, {
      type: 'pie',
      data: data,
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        },
      }
    });
  }

}
