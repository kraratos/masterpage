import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";
import { DtickOneMonth } from "src/constants/constant";
@Injectable({
  providedIn: "root"
}
)
export class Utils {
  static getFormatedDate(date: Date, format: string = 'yyyy-MM-dd') {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format) ?? '1970-01-01';
  }

  public static getStartEndDateRangeAsString(activekey: string) {
    var startDate = new Date();
    var today = new Date();
    var endDate = new Date();
    startDate.setDate(1);
    endDate.setDate(1);
    var incrementEndDate=1;
    switch (activekey) {
      case "3M": { startDate.setMonth(today.getMonth() - 3); endDate.setMonth(today.getMonth() + 3); } break;
      case "6M": { startDate.setMonth(today.getMonth() - 6); endDate.setMonth(today.getMonth() + 6); } break;
      case "1Y": {
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setMonth(0);
        startDate.setDate(1);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setMonth(0);
        endDate.setDate(1);
        incrementEndDate =12
      } break;
      case "YTD": { startDate.setMonth(today.getMonth() - 12); endDate.setMonth(today.getMonth() + 12);incrementEndDate =12 -today.getMonth() } break;
      case "3MF": { startDate.setMonth(today.getMonth() - 3); endDate.setMonth(today.getMonth() + 3); } break;
      case "6MF": { startDate.setMonth(today.getMonth() - 6); endDate.setMonth(today.getMonth() + 6); } break;
      case "1YF": {
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setMonth(0);
        startDate.setDate(1);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setMonth(0);
        endDate.setDate(1);
        incrementEndDate =12 
      } break;
      case "YTDF": { startDate.setMonth(today.getMonth() - 12); endDate.setMonth(today.getMonth() + 12);incrementEndDate =12 -today.getMonth() } break;


    }


    var dateTestStart = new Date(startDate);
    dateTestStart.setMonth(dateTestStart.getMonth() + 1)
    dateTestStart.setDate(0);
    var lastDayOfStarDateMonth = dateTestStart.getDate();
    if(startDate.getDate() > lastDayOfStarDateMonth){
      startDate.setDate(lastDayOfStarDateMonth);
    }

    var dateTestEnd = new Date(endDate);
    dateTestEnd.setMonth(dateTestEnd.getMonth()+incrementEndDate)
    dateTestEnd.setDate(0);
    var lastDayOfMonthEndDate = dateTestEnd.getDate();
   
    if(endDate.getDate()>lastDayOfMonthEndDate)
          endDate.setDate(lastDayOfMonthEndDate);
    
    var startDateS = Utils.makeDateString(startDate);
    var endDateS = Utils.makeDateString(endDate);
 
  
    return { startDateS, endDateS };
  }

  public static makeDateString(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() == 0 ? '1' : date.getMonth()) + '-' + date.getDate();
  }
  public static removeTimelineDOM(divId: string) {
    try {
      var divTimeline: HTMLElement = document.getElementById(divId) as HTMLElement;
      divTimeline.remove();
    } catch (error) {
      console.log(error)
    }
  }

  public static getParamsFromNavigationApp(params: any) {
    console.log("Static parameter", params);
    let parametersAsString: string = params["Parameters"];
    console.log("Static parameter parametersAsString: ", parametersAsString);
    let parameter: Array<string> = parametersAsString.split('&');
    let parameterMap: any = parameter.reduce((prev: { [key: string]: string }, curr) => {
      let keyValue: string[] = curr.split("=");
      prev[keyValue[0]] = keyValue[1];
      return prev;
    }, {});

    return parameterMap;
  }
}
