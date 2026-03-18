import { Injectable } from '@angular/core';
import {HttpAbstractBackendService} from "./abstract/http-abstract-backend.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExampleResponse} from "src/interface";
import {HttpOptionsRequestInterface} from "../../interface/http/http-options-request-interface";
@Injectable({
  providedIn: 'root'
})
export class ExampleApiService extends HttpAbstractBackendService{

  private _baseUrlApi:string = 'https://reqres.in';
  private _uriServiceApi:string = 'api';

  private _defaultOptions: HttpOptionsRequestInterface =
    {
      observe: "body",
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Content-Type':  ['application/json-patch+json','application/json','application/_*+json'],
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

  public getAll():Observable<ExampleResponse[]>{
    // Ovveride example
    // this._defaultOptions.observe='body';
    return this.getRequest<ExampleResponse[]>('users', this._defaultOptions);
  }
  public getAllUsers(id:string):Observable<ExampleResponse[]> {
    return this.getRequest(`users?page=${id}`, this._defaultOptions);
  }
  public getDelayExample(name:string):Observable<ExampleResponse[]> {
    return this.getRequest(`users?delay=${name}`, this._defaultOptions);
  }

}
