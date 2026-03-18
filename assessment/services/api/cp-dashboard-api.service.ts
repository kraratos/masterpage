import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserSettingsResponse} from "src/interface";
import {LayoutResponse} from "src/interface/layout-response";
import {HttpAbstractBackendService} from "./abstract/http-abstract-backend.service";
import {HttpOptionsRequestInterface} from "src/interface/http/http-options-request-interface";
import {clone} from "underscore";

@Injectable({
  providedIn: 'root'
})
export class CpDashboardApiService extends HttpAbstractBackendService{
  private _baseUrlApi:string = 'cp-dashboard-service';
  private _uriServiceApi:string = 'v1';

  private _defaultOptions: HttpOptionsRequestInterface =
    {
      observe: "body",
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Content-Type':  ['application/json'],
      }),
      //params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
      //reportProgress?: boolean,
      //responseType?: 'arraybuffer'|'blob'|'json'|'text',
      //withCredentials?: boolean,
    };

  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig();
  }

  private setApiConfig(){
    this.baseUrl = this._baseUrlApi+'/'+this._uriServiceApi+'/';
  }
  

  public getUserSetting():Observable<UserSettingsResponse[]>{
    return this.getRequest<UserSettingsResponse[]>('settings',this._defaultOptions);
  }
  public getLayouts(payload:string):Observable<LayoutResponse>{
    return this.postRequest<LayoutResponse>('layouts', payload,this._defaultOptions);
  }
    public getWidgetsForUser(payload: any): Observable<any> {
    return this.postRequest<any>('microapp/layouts', payload, this._defaultOptions);
  }
  public fetchLogo(id: any) {
    let options = clone(this._defaultOptions);
    options.responseType='blob';
    return this.getRequest(`images/${id}`,options);
  }
}
