import {Injectable} from '@angular/core';
import axios from 'axios';
import * as _ from 'underscore';
import {NotificationService} from "./notification.service";
import {ToastrService} from "ngx-toastr";

interface RequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: object;
  accessToken?: string;
}

const baseApiUrl: string = 'http://localhost:3105' + '/api';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  static toastr: ToastrService

  constructor(
    private toastr: ToastrService
  ) {
    HttpService.toastr = toastr;
  }


  static async executeRequest(params: RequestParams) {
    let config: any = {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      withCredentials: false, // default
      method: params.method,
      url: params.url,
    };

    const queryParameters = params.queryParameters;

    if (queryParameters) {
      config['params'] = queryParameters;
    }

    if (params.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + params.accessToken;
    }

    if (params.body) {
      config['data'] = params.body
    }

    return this.hitApi(config);
  }

  async post(url: string, query: any, data: any, accessToken: string) {
    const requestParams: RequestParams = {
      method: 'POST',
      url: `${baseApiUrl}/${url}`,
      body: data,
      queryParameters: query,
      accessToken: accessToken
    };
    return HttpService.executeRequest(requestParams);
  }

  static async hitApi(request = {}) {
    return axios(request)
      .then((res) => {
        return res
      }).catch((err) => {
        console.log('err', err);
        if (err && err.response && err.response.status === 422 && typeof err.response.data.data === 'object') {
          console.log(err.response.data.message)
          this.toastr.error(err.response.data.message);
          _.each(err.response.data.data, (data) => {
            _.each(data, (error) => {
              this.toastr.error(error);
            });
          })
        } else if (err && err.response && err.response.status === 422 && typeof err.response.data.data === "string") {
          this.toastr.error(err.response.data.data);
        } else if (err && err.response && err.response.status && err.response.data.message) {
          this.toastr.error(err.response.data.message);
        } else {
          this.toastr.error('Network Error');
        }
        throw err
      });
  }
}


