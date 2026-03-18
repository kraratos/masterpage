import { Injectable } from "@angular/core";
import {DatePipe} from "@angular/common";
@Injectable({
  providedIn : "root"}
)
export class Utils {
  static getFormatedDate(date: Date, format: string = 'yyyy-MM-dd') {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format)??'1970-01-01';
  }
}
