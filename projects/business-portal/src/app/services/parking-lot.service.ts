import {Injectable} from '@angular/core';
import {HttpService} from "../../../../common-services/http.service";
import {NotificationService} from "../../../../common-services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async list() {
    try {
      const res = await this.httpService.executeRequest('business/parking-lot', 'get').toPromise();
      return res.data
    } catch (e) {
      return null
    }
  }

  async create(data: object) {
    try {
      const res = await this.httpService.executeRequest('business/parking-lot', 'post', data).toPromise();
      return res.body
    } catch (e) {
      return null
    }
  }

  async get(id: string) {
    try {
      return await this.httpService.executeRequest('business/parking-lot/' + id, 'get').toPromise()
    } catch (e) {
      return null
    }
  }

  async delete(id: string) {
    try {
      return await this.httpService.executeRequest('business/parking-lot/' + id, 'delete').toPromise()
    } catch (e) {
      return null
    }
  }

  async edit(id: string, data: object) {
    try {
      const res = await this.httpService.executeRequest('business/parking-lot/' + id, 'patch', data).toPromise()
      return res.body
    } catch (e) {
      return null
    }
  }
}
