import {WidgetInfoResponse} from "./widget-info-response";

export interface LayoutWidgetResponse {
  id:number;
  title:string;
  description:string;
  detailsUri:string;
  iconImageId:number;
  staticImageId:number;
  greyImageId:number;
  info:WidgetInfoResponse;
  lockIconMessage:string
  orderNumber:number;
  widgetCustomizationId:number;
  footer:string
  widthSpan:number;
  static:boolean;
  paidService:boolean;
  timeline:boolean;
  pinnedWidget:boolean;
}
