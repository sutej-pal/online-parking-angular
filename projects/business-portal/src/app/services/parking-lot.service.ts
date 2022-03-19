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
}
