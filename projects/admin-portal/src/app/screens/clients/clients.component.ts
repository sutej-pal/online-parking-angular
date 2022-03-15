import {Component, OnInit} from '@angular/core';

export interface PeriodicElement {
  id: number;
  clientName: string;
  address: string;
  parkingLots: number;
  status: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  tableColumns: string[] = [
    'id',
    'businessName',
    'address',
    'parkingLots',
    'status',
  ];
  searchColumns: string[] = [
    'search_id',
    'search_businessName',
    'search_address',
    'search_parkingLots',
    'search_status',
  ];
  dataSource: PeriodicElement[] = [];
  search = {
    id: '',
    businessName: '',
    address: '',
    parkingLots: '',
    status: '',
  }

  constructor() {
  }

  ngOnInit() {
    this.dataSource = [
      {id: 1, clientName: 'Hydrogen', address: '1.0079', parkingLots: 1, status: 'Active'},
      {id: 2, clientName: 'Helium', address: '4.0026', parkingLots: 1, status: 'Active'},
      {id: 3, clientName: 'Lithium', address: '6.941', parkingLots: 1, status: 'Active'},
      {id: 4, clientName: 'Beryllium', address: '9.0122', parkingLots: 1, status: 'Active'},
      {id: 5, clientName: 'Boron', address: '10.811', parkingLots: 1, status: 'Active'},
      {id: 6, clientName: 'Carbon', address: '12.0107', parkingLots: 1, status: 'Active'},
      {id: 7, clientName: 'Nitrogen', address: '14.0067', parkingLots: 1, status: 'Active'},
      {id: 8, clientName: 'Oxygen', address: '15.9994', parkingLots: 1, status: 'Active'},
      {id: 9, clientName: 'Fluorine', address: '18.9984', parkingLots: 1, status: 'Active'},
      {id: 10, clientName: 'Neon', address: '20.1797', parkingLots: 1, status: 'Active'},
    ]
  }

}
