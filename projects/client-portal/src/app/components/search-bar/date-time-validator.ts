import {ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";

export class DateTimeValidator {
  static validateDiff(from: string, to: string): ValidatorFn {
    return (control: any): ValidationErrors | null => {
      if (control) {
        const arrivalDateTime = control.get(from).value
        const exitDateTime = control.get(to).value;
        if (exitDateTime !== '' && arrivalDateTime !== '') {
          const diff = moment(exitDateTime).diff(moment(arrivalDateTime), 'minutes');
          // console.log(diff, 'arrivalDateTime => ', arrivalDateTime.toString(), 'exitDateTime => ', exitDateTime.toString());
          if (diff < 30) {
            return {invalidDates: "Arrival Date-time should be less than Exit-time"};
          } else {
            return null
          }
        } else {
          return null
        }
      }
      return null;
    };
  }
}
