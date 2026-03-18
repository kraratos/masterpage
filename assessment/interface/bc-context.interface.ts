export interface BcContextInput {
  rootAppName: string;
  body: Array<any>;
  navigateToAppName?: string;
  orginalBreadcrumbs: Array<any>;
  origin: string;
  eventName: string;
  selectedVid?:string;
  sortingOrder:string
}
