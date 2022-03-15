import { Injectable } from '@angular/core';
import {HttpService} from "../../../../common-services/http.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(
    private http: HttpClient
  ) { }

  async getList() {
    try {
      const response = await this.http.get('http://localhost:3105' + '/api' + '/business/parking-lot').toPromise();
      console.log('response', response);
    } catch (e) {

    }
  }
}
