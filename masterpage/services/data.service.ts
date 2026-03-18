import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {DualKeyCache } from 'src/models/cache-entry';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projectVid: any;
  currentAssetID: string | undefined;
  level: any;
   hierachyData:any| undefined;
  public getHierachyData():any{
    return this.hierachyData;
  }
  public setHierachyData(data:any):void{
    this.hierachyData=data
  }

  public selectedDateRange: any = '3M';
  public customerName: string | undefined;
  public advanceServiceDatePayload: any = '';
  public selectedVid: string | undefined;
  public assetDescription: string | undefined;

  private dateRangeSubject = new BehaviorSubject<string>('3M');
  currentDateRange = this.dateRangeSubject.asObservable();
  updateOnDateChange(dateRange: string) {
    this.selectedDateRange = dateRange;
    this.dateRangeSubject.next(dateRange);
  }
  public selectedDateIndex = 0;

  private assetSubject = new BehaviorSubject<string>('');

  public emitAsset(asset:string):void{
    this.assetSubject.next(asset);
  }
  public getAssetSubject():Observable<any>{
    return this.assetSubject.asObservable();
  }
  public calculateDateRange(selectedDateRange: any): any {
    let currentDate = new Date();
    let fromDate;
    if (selectedDateRange === '3M') {
      fromDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    } else if (selectedDateRange === '6M') {
      fromDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    } else if (selectedDateRange === 'YTD') {
      let currentYear = currentDate.getFullYear();
      fromDate = new Date(currentYear, 0, 1);
    } else if (selectedDateRange === '1Y') {
      fromDate = new Date(currentDate.setMonth(currentDate.getMonth() - 12));
    }

    return {
      fromDate,
      currentDate: new Date()
    };
  }

  private selectedDateRangeSubject = new BehaviorSubject<any>({});
  selectedDateRangeObservable = this.selectedDateRangeSubject.asObservable();
  public fnSelectedDateRange(fromDate: any, toDate:any, mode: string, sampleInterval: number): any {
    this.selectedDateRangeSubject.next({fromDate, toDate, mode, sampleInterval});
  }

  private selectedSamplingSubject = new BehaviorSubject<any>({});
  selectedSamplingObservable = this.selectedSamplingSubject.asObservable();
  public fnSelectedSampling(samplingValue:string|undefined,selectedDateRange:string,fromDate:Date,currentDate:Date): any {
    this.selectedSamplingSubject.next({samplingValue,selectedDateRange,fromDate,currentDate});
  }

  private pageErrorSubject = new BehaviorSubject<any>({error:false});
  pageStatus = this.pageErrorSubject.asObservable();
  pageError(state:boolean): void {
    this.pageErrorSubject.next({ error: state } as pageStatus);
  }

  getProject():any{
    return this.projectVid;
  }
  setProject(vid: any) {
    this.projectVid= vid;
  }
  getLevel():any{
    return  this.level;
  }
  setCurrentLevel(level: any) {
   this.level=level;
  }
  getCurrentAssetId():any{
    return this.currentAssetID;
  }
  setCurrentAssetId(idFromVID: string) {
    this.currentAssetID=idFromVID;
  }

  private navigationPayloadContextSubject = new BehaviorSubject<any>({});
  navigationPayloadContextObservable = this.navigationPayloadContextSubject.asObservable();
  public setNavigationPayloadContext(navigationContext: any): any {
    this.navigationPayloadContextSubject.next({navigationContext});
  }

  private optionsMicroAppLayoutSubject = new BehaviorSubject<Array<pageOptions>>([]);
  optionsMicroAppLayout = this.optionsMicroAppLayoutSubject.asObservable();
  setOptionsMicroAppLayoutSubject(pageOptions: Array<pageOptions>): void {
    this.optionsMicroAppLayoutSubject.next(pageOptions);
  }

  private selectedPageSubject = new BehaviorSubject<any>([]);
  selectedPage = this.selectedPageSubject.asObservable();
  setSelectedPageLayoutSubject(page: any): void {
    this.selectedPageSubject.next(page);
  }

  cache = new DualKeyCache();
  cancelRequests$ = new Subject<void>();

  cancelAllPendingRequest() {
    this.cache.deleteAll();
  }
}
export interface pageStatus {
  error: boolean;
}
export interface pageOptions {parameterType:string,parameterValue:string}
