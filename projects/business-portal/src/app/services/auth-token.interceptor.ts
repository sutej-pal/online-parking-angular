import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      let modifiedReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + token)
      })
      return next.handle(modifiedReq)
    } else {
      return next.handle(req);
    }
  }

}
