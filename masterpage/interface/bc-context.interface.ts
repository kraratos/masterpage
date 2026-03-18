export interface BcContextInput {
  rootAppName: string;
  body: Array<any>;
  navigateToAppName?: string;
  orginalBreadcrumbs: Array<any>;
  origin: string;
  selectedVid?:string;
  eventName: string;
  sortingOrder:string
}
