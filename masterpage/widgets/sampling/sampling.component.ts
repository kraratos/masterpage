import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ToasterMessageService} from "../../services/toaster-message.service";

@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.scss']
})
export class SamplingComponent implements OnInit{
  private selectedDateRange!: string;
  private fromDate!: Date;
  private currentDate!: Date;
  samplingValue!: string;
  isMonthlyDisable: boolean=false;
  isDailyDisable:   boolean=false;
  isHourlyDisable:  boolean=false;
  isChecked!: boolean;
  disableAllCheckbox: boolean=false;
  error: boolean=true;

  constructor(
    private dataService: DataService,
    private toaster: ToasterMessageService
  ){}
  ngOnInit(): void {
    // this.dataService.selectedSamplingObservable.subscribe(value => {
    //   if(Object.keys(value).length<=0)
    //     return;
    //   const { samplingValue,selectedDateRange,fromDate,currentDate} = value;
    //   this.samplingValue = samplingValue;
    //   if(this.samplingValue==undefined){
    //     this.disableAllCheckbox=true;
    //     this.error=true;
    //   }
    //   setTimeout(()=>{this.disableAllCheckbox=false},0.00000001)
    // })
    // this.dataService.currentDateRange.subscribe(value => {
    //   const { fromDate, currentDate } = this.dataService.calculateDateRange(value || '3M');
    //   this.selectedDateRange=value;
    //   this.fromDate=new Date(fromDate);
    //   this.currentDate=new Date(currentDate);
    //   this.isHourlyDisable=this.isDailyDisable=this.isMonthlyDisable=false;
    //   this.isChecked = false;
    //   switch (this.selectedDateRange) {
    //     case '6M':
    //      this.isHourlyDisable=true;
    //      break;
    //     case 'YTD':
    //       this.isHourlyDisable=this.isDailyDisable=true;
    //       break;
    //     case '1Y':
    //       this.isHourlyDisable=this.isDailyDisable=true;
    //       break;
    //   }
    // });
    // this.dataService.selectedDateRangeObservable.subscribe(value => {
    //   if(Object.keys(value).length<=0)
    //     return;
    //   const { fromDate, toDate} = value;
    //   this.fromDate = new Date(fromDate);
    //   this.currentDate = new Date(toDate);
    //   let interval = this.currentDate.getTime() - this.fromDate.getTime()
    //   this.isHourlyDisable=this.isDailyDisable=this.isMonthlyDisable=false;
    //   this.isChecked = false;
    //   if(interval > 7884000000) { //3 Month
    //     this.isHourlyDisable = true; //disable hourly if more 3 month
    //   }
    //   if(interval > 15768017279) {//6 Month
    //     this.isDailyDisable = true; //disable also daily if more 6 month
    //   }
    // })
  }


  checkSampling($event:any) {
    this.error = false;
    this.samplingValue = $event.target.value;
    this.dataService.fnSelectedSampling(this.samplingValue,this.selectedDateRange,this.fromDate,this.currentDate);
  }
}
