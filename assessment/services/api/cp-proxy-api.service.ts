import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserSettingsResponse } from "src/interface";
import { LayoutResponse } from "src/interface/layout-response";
import { HttpAbstractBackendService } from "./abstract/http-abstract-backend.service";
import { HttpOptionsRequestInterface } from "src/interface/http/http-options-request-interface";
import { clone } from "underscore";

@Injectable({
  providedIn: 'root'
})
export class CpProxyDataApiService extends HttpAbstractBackendService {
  private _baseUrlApi: string = 'cp-proxy-data-service';
  private _uriServiceApi: string = 'v1';

  private _defaultOptions: HttpOptionsRequestInterface =
    {
      observe: "body",
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': ['application/json'],
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

  private setApiConfig() {
    this.baseUrl = this._baseUrlApi + '/' + this._uriServiceApi + '/';
  }

  public getWidgetData(payload: any): Observable<any> {
    return this.postRequest<any>('/widgetsdata', payload, this._defaultOptions)
  }
  

}
