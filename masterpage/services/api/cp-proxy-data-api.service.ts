import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpAbstractBackendService } from "./abstract/http-abstract-backend.service";
import { HttpOptionsRequestInterface } from "src/interface/http/http-options-request-interface";

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
      })
    };

  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig();
  }

  private setApiConfig() {
    this.baseUrl = this._baseUrlApi + '/' + this._uriServiceApi + '/';
  }

  public getWidgetData(payload: any): Observable<any> {
    return this.postRequest<any>('widgetsdata', payload, this._defaultOptions)
  }
}
