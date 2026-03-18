import {HeaderResponse} from "./header-response";
import {LayoutAssetResponse} from "./layout-asset-response";
import {LayoutWidgetResponse} from "./layout-widget-response";

export interface LayoutResponse {
  header:HeaderResponse;
  myDashboard:boolean;
  customizationId:number;
  level:string;
  parentVid:string;
  selectedVid:string;
  selectedId:string;
  selectedTitle:string;
  assets:LayoutAssetResponse[];
  kpis: LayoutWidgetResponse[];
  summary:LayoutWidgetResponse[];
  dateRange:string;
}
