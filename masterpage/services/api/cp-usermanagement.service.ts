import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserSettingsResponse } from "src/interface";
import { HttpAbstractBackendService } from "./abstract/http-abstract-backend.service";
import { HttpOptionsRequestInterface } from "src/interface/http/http-options-request-interface";

@Injectable({
  providedIn: 'root'
})
export class CpUserManagementService extends HttpAbstractBackendService {
  private _baseUrlApi: string = 'cp-usermaangement-service';
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
  public getUserInfo(): Observable<UserSettingsResponse[]> {
    return this.getRequest<any>('me', this._defaultOptions);
  }

}
