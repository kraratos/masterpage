import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserSettingsResponse} from "src/interface";
import {LayoutResponse} from "src/interface/layout-response";
import {HttpAbstractBackendService} from "./abstract/http-abstract-backend.service";
import {HttpOptionsRequestInterface} from "src/interface/http/http-options-request-interface";
import {clone} from "underscore";

@Injectable({
  providedIn: 'root'
})
export class CpUserManagementApiService extends HttpAbstractBackendService{
  private _baseUrlApi:string = 'cp-user-management-service';
  private _uriServiceApi:string = 'v1';
  private _defaultOptions: HttpOptionsRequestInterface =
    {
      observe: "body",
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Content-Type':  ['application/json'],
      })
  };

  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig();
  }

  private setApiConfig(){
    this.baseUrl = this._baseUrlApi+'/'+this._uriServiceApi+'/';
  }

  fetchMeDetails() {
    return this.http.get('cp-user-management-service/v1/me/details');
  }

  fetchMePrivileges() {
    return this.http.get('cp-user-management-service/v1/me/privileges');
  }

  fetchMeHierarchy() {
    var response = this.http.get('cp-user-management-service/v1/me/hierarchy');
    return response;
  }
}
