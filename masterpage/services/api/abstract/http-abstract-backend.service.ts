import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {HttpOptionsRequestInterface} from "src/interface/http/http-options-request-interface";


export abstract class HttpAbstractBackendService {

  private _baseUrl:string = environment.apiUrl;
  protected constructor(protected http: HttpClient) {}
  get baseUrl(): string {
    return this._baseUrl;
  }
  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  protected getRequest<T>(endPoint:string, options?: HttpOptionsRequestInterface):any {
    return this.http.get<T>(`${this._baseUrl}${endPoint}`, this.getRequestOptions(options));
  }

  protected postRequest<T>(endPoint:string, body?: any, options?: HttpOptionsRequestInterface ):any {
    return this.http.post<T>(`${this._baseUrl}${endPoint}`,body,this.getRequestOptions(options));
  }

  protected putRequest<T>(endPoint:string, body?: any, options?: HttpOptionsRequestInterface ):any {
    return this.http.put<T>(`${this._baseUrl}${endPoint}`, body,this.getRequestOptions(options));
  }

  protected deleteRequest<T>(endPoint:string, options?: HttpOptionsRequestInterface ):any {
    return this.http.delete<T>(`${this._baseUrl}${endPoint}`,this.getRequestOptions(options));
  }

  private getRequestOptions(options?:HttpOptionsRequestInterface):any {
    if (!options){
      return {};
    }else{
      return {
        headers: options?.headers,
        observe: options?.observe,
        params:  options?.params,
        reportProgress: options?.reportProgress,
        responseType: options?.responseType ,
        withCredentials: options.withCredentials
      }
    }
  }

}
