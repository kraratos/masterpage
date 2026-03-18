import {Component, Input, OnInit} from '@angular/core';
import {ICalendarFilter} from "src/interface/calendar-filter";
import {CalendarFilter} from "src/enum/calendar-filter";
import * as _ from 'underscore';
import {CpDashboardApiService} from "src/services/api/cp-dashboard-api.service";
import {MicroAppService} from "src/services/micro-app.service";
import {LoaderService} from "../../services/loader.service";
import { DataService } from 'src/services/test/data.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  public calendarFilters: Array<ICalendarFilter> = CalendarFilter;
  public selectedDateIndex: any;
  public selectedDateRange: any;
  public fromDate!: Date;
  public currentDate!: Date;

  public companyLogo: any;
  public _navbarData: any = null;

  viewRangeDatepicker: boolean = true;
  isInvalidDateRange: boolean = false;
  errorMessageDateRange:string = 'Select an interval smaller than one year!';
  dateValueRange!: any[]|undefined;

  @Input() set navbarData(data) {
    if (data) {
      this._navbarData = data;
      if (data?.companyLogo) this.fetchLogoInfo();
    }
  }

  get navbarData() {
    return this._navbarData;
  }

  @Input() public isLevelProject: string = '';

  constructor(
    private cpDashboardApi: CpDashboardApiService,
    public dataService: DataService,
    public microAppService: MicroAppService
  ) {}
  ngOnInit(): void {
    this.dataService.currentDateRange.subscribe((dateRange) => {
      this.dateValueRange=undefined;
      this.viewRangeDatepicker=false;
      this.selectedDateRange = dateRange;
      const { fromDate, currentDate } = this.dataService.calculateDateRange(this.selectedDateRange);
      this.fromDate = fromDate;
      this.currentDate = currentDate;
      this.selectedDateIndex = this.dataService.selectedDateIndex;
      setTimeout(()=>{this.viewRangeDatepicker=true},0.1)
    });

    this.dataService.selectedDateRangeObservable.subscribe(value => {
      if(Object.keys(value).length<=0)
        return;
      const { fromDate, toDate } = value;
      this.fromDate=new Date(fromDate);
      this.currentDate=new Date(toDate);
      this.dateValueRange=[this.fromDate,this.currentDate];
    })
  }

  dateFilterChange(calendarFilterIndex: any, dateRange: any) {
    this.viewRangeDatepicker = true;
    this.dataService.selectedDateIndex = calendarFilterIndex;
    this.selectedDateIndex = calendarFilterIndex;
    this.selectedDateRange = dateRange;
    this.dataService.fnSelectedSampling(undefined,this.selectedDateRange,this.fromDate,this.currentDate)
    this.dataService.updateOnDateChange(this.selectedDateRange);
    this.dataService.calculateDateRange(this.selectedDateRange);
  }


  fetchLogoInfo(): void {
    this.cpDashboardApi.fetchLogo(this.navbarData.companyLogo).subscribe({
      next: (res: any) => {
        if (res) {
          const reader = new FileReader();
          reader.readAsBinaryString(res);
          const imageBlob: any = [];
          const addPreview = (fileBase64: any) => {
            imageBlob.push(`data:${res.type};base64,${btoa(fileBase64)}`);
            if (imageBlob?.length) this.companyLogo = _.first(imageBlob);
          };
          reader.onload = function (e: any) {
            addPreview(e.target.result);
          };
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  dateRangePickerChange($event: CustomEvent<any>) {
    if ($event.detail.end === undefined)
      return;
    if ($event.detail.end.ts < $event.detail.start.ts ){
      this.errorMessageDateRange = 'Adjust the Date';
      return;
    }
    this.dataService.selectedDateIndex = 4;
    this.selectedDateIndex = 4;
    let currentDate = new Date();
    if ($event.detail.end.ts > new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()) {
      this.errorMessageDateRange = 'Max Date selected is Today';
      this.isInvalidDateRange = true;
    } else if ($event.detail.end.ts - $event.detail.start.ts > 31557600000 ){
      this.errorMessageDateRange = 'Date selected out of Range. Max range is 1 Year';
      this.isInvalidDateRange = true;
    }else{
      let mode= 'interpolated', sampleInterval = 60000;
      if ($event.detail.end.ts - $event.detail.start.ts > 7884000000 ){
        mode= 'trend';
        sampleInterval = 3600000;
      }
      this.isInvalidDateRange = false;
      this.dataService.fnSelectedDateRange($event.detail.start.ts, $event.detail.end.ts, mode, sampleInterval);
      this.fromDate = new Date($event.detail.start.ts);
      this.currentDate = new Date($event.detail.end.ts);
    }
  }
  showCustomDatePicker(selectedDateIndex: number, dateRange: any){
    this.viewRangeDatepicker = true;
    this.dataService.selectedDateIndex = selectedDateIndex;
    this.selectedDateIndex = selectedDateIndex;
    this.selectedDateRange = dateRange;
    this.dataService.updateOnDateChange(this.selectedDateRange);
  }
}
