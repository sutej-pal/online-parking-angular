import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  businessName: string;
  address: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, businessName: 'Hydrogen', address: '1.0079', status: 'H'},
  {id: 2, businessName: 'Helium', address: '4.0026', status: 'He'},
  {id: 3, businessName: 'Lithium', address: '6.941', status: 'Li'},
  {id: 4, businessName: 'Beryllium', address: '9.0122', status: 'Be'},
  {id: 5, businessName: 'Boron', address: '10.811', status: 'B'},
  {id: 6, businessName: 'Carbon', address: '12.0107', status: 'C'},
  {id: 7, businessName: 'Nitrogen', address: '14.0067', status: 'N'},
  {id: 8, businessName: 'Oxygen', address: '15.9994', status: 'O'},
  {id: 9, businessName: 'Fluorine', address: '18.9984', status: 'F'},
  {id: 10, businessName: 'Neon', address: '20.1797', status: 'Ne'},
];

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
    'status',
  ];
  searchColumns: string[] = [
    'search_id',
    'search_businessName',
    'search_address',
    'search_status',
  ];
  dataSource = ELEMENT_DATA;
  search = {
    id: '',
    businessName: '',
    address: '',
    status: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
