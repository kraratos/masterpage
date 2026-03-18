import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {CpDashboardApiService} from "./api/cp-dashboard-api.service";
import { DataService } from './test/data.service';

@Injectable({
  providedIn: 'root'
})
export class MicroAppService {
  public dasboardSubject = new Subject<any>();
  public dashboardState = this.dasboardSubject.asObservable();
  public parentVid: any;
  public parentLevel: any;
  public selectedVid: any;
  public selectedId:any;
  public selectedLevel: any;
  public selectedKPI: any;


  constructor(private cpDashboardApiService: CpDashboardApiService, private dataService: DataService) { }

  fetchMicroAppLayout(payload: any) {
    this.parentVid = payload.vid;
    this.parentLevel = payload.level;
    return new Observable((subscriber) => {
      this.cpDashboardApiService.getLayouts(payload).subscribe((res) => {
        this.dasboardSubject.next(res);
        if (res.selectedVid !== null || res.selectedVid !== '' || res.selectedVid !== undefined) {
          const mappedAsset = res?.assets.filter((item: { vid: string }) => {
            return item.vid === res.selectedVid;
          });
          if (mappedAsset.length !== 0) {
            this.dataService.customerName = mappedAsset[0].customerName;
          }
          this.dataService.selectedVid=res.selectedVid;
        }
        subscriber.next(res);
        subscriber.complete();
      });
    });
  }
}
