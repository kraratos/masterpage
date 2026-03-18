import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MaintenceServiceService {
  http: HttpClient | undefined;
 

  constructor(http:HttpClient)  {
    this.http=http
   }


   postMaitenaceEvents(startDate:string,endDate:string,machines:string):any {

    return this.http?.post(environment.maintenance_api_proxy,{'serviceId':87,'gibSn':machines,'startDate':startDate,'endDate':endDate})
 
 
   }
}
