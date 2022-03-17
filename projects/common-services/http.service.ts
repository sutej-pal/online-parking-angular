import {Injectable} from '@angular/core';
import axios from 'axios';
import * as _ from 'underscore';
import {NotificationService} from "./notification.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

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
    private toastr: ToastrService,
    private httpClient: HttpClient
  ) {
    HttpService.toastr = toastr;
  }


  async executeRequest(params: RequestParams) {
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

  async makeRequest(url: string, method: string, data: any, options: { queryParameters?: any, accessToken?: string }) {
    const requestParams: RequestParams = {
      method: 'POST',
      url: `${baseApiUrl}/${url}`,
      body: data,
      queryParameters: options.queryParameters,
      accessToken: options.accessToken
    };
    return this.executeRequest(requestParams);
  }

  async hitApi(request: RequestParams) {
    switch (request.method) {
      case 'GET':
        return this.httpClient.get(request.url);
      case 'POST':
        return this.httpClient.post(request.url, request.body, {observe: 'response'});
      case 'DELETE':
        return this.httpClient.delete(request.url);
      case 'PUT':
        return this.httpClient.put(request.url, request.body, {observe: 'response'});
      case 'PATCH':
        return this.httpClient.patch(request.url, request.body, {observe: 'response'});
      default:
        return 'Invalid Method Request : 400 Method (' + request.method + ') not allowed ';
    }
    // return
    // return axios(request)
    //   .then((res) => {
    //     return res
    //   }).catch((err) => {
    //     console.log('err', err);
    //     if (err && err.response && err.response.status === 422 && typeof err.response.data.data === 'object') {
    //       console.log(err.response.data.message)
    //       this.toastr.error(err.response.data.message);
    //       _.each(err.response.data.data, (data) => {
    //         _.each(data, (error) => {
    //           this.toastr.error(error);
    //         });
    //       })
    //     } else if (err && err.response && err.response.status === 422 && typeof err.response.data.data === "string") {
    //       this.toastr.error(err.response.data.data);
    //     } else if (err && err.response && err.response.status && err.response.data.message) {
    //       this.toastr.error(err.response.data.message);
    //     } else {
    //       this.toastr.error('Network Error');
    //     }
    //     throw err
    //   });
  }
}


