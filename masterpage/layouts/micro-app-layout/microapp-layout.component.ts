import { Component, OnInit } from '@angular/core';
import { ContextSharingService } from 'src/services/context-sharing.service';
import { LoaderService } from 'src/services/loader.service';
import { isArray, isEmpty, last, first, flatten, findIndex } from 'underscore';
import * as _ from 'underscore';
import { MicroAppService } from "src/services/micro-app.service";
import { Subscription } from "rxjs";
import { DataService } from "src/services/data.service";
import { BC_EVENT_NAMES } from "../../enum/bc-event-names.enum";
import { APP_NAMES } from "../../enum/app-names.enum";
import { BcContextInput } from "../../interface/bc-context.interface";
import { DataUtil } from 'src/utils/dataUtils';
import { UNDERSCORE } from 'src/utils/constants';
import { LEVELS } from 'src/enum/enums';
import { CpDashboardApiService } from "src/services/api/cp-dashboard-api.service"
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/utils/utils';

@Component({
  selector: 'micro-app-layout',
  templateUrl: './microapp-layout.component.html',
  styleUrls: ['./microapp-layout.component.scss']
})
export class MicroAppLayoutComponent implements OnInit {
  public layoutSubscription!: Subscription;
  public layoutData: any;
  selectedNode: any;
  contextData: any;
  contextMap: any = {};
  constructor(
    private readonly contextSharing: ContextSharingService,
    private loaderService: LoaderService,
    private microAppService: MicroAppService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

   
  }

  parseLayoutData(res: any) {
    this.layoutData = res;
    // this.loaderService.hideLoader();
  }

  async subsribeCnxtEvents(getContext: any = null) {
    let data: any = null;
    if (!getContext) {
      getContext = this.contextSharing.readContext();
    }
    console.log("getContext", getContext);
    let readContext: any = null;
    if (getContext?.context) {
      readContext = [last(getContext.context)].find((o: any) => {
        return (
          o.payLoad?.eventName === BC_EVENT_NAMES.HIERARCHY_NODE_CLICK_EVENT ||
          o.payLoad?.eventName === BC_EVENT_NAMES.BREAD_CRUMB_CLICK_EVENT
        );
      });
      if (readContext) {
        let { eventName, rootAppName, body: data = null } = readContext.payLoad;
        if (data && isArray(data)) data = last(data);
        if (this.microAppService.selectedVid != data.vid) {
          if (!data || (data && data?.name === 'Home')) {
            const payload = {
              level: null,
              vid: null
            };
            this.fetchLayoutData(payload);
            return;
          }
          const { veiwLevel, vid } = data;
          this.selectedNode = data;
          const payload = {
            level: veiwLevel,
            vid: vid,
            showSiblings: true
          };
          var indexOfUnderScore = (payload.vid as string).indexOf("_");
          this.microAppService.selectedVid = payload.vid;
          this.microAppService.selectedLevel = payload.level;
          this.fetchLayoutData(payload, eventName, rootAppName);
          return;
        }
      }
    } else {
      let payloadData: any;
      if (localStorage.getItem('levelFlag') != null && localStorage.getItem('levelFlag') == 'true') {
        if (localStorage.getItem('parentLevel') != null || localStorage.getItem('parentLevel') !== undefined) {
          let data: any = localStorage.getItem('parentLevel');
          data = JSON.parse(data);
          if (data.level == 'projects') {
            payloadData = {
              level: data?.level,
              showSiblings: true,
              vid: this.microAppService.selectedVid
            };
          } else {
            payloadData = {
              level: data?.level,
              vid: data?.vid
            };
            localStorage.removeItem('levelFlag');
            localStorage.removeItem('parentLevel');
          }
        }
      } else {
        payloadData = {
          level: null,
          vid: this.microAppService.selectedVid || null
        };
      }
      this.fetchLayoutData(payloadData);
    }

    //Navigation event Start
    let contextNavigationFiltered = getContext.context.filter((x: { payLoad: { eventName: string; }; }) => x.payLoad?.eventName === BC_EVENT_NAMES.NAVIGATION);
    if (contextNavigationFiltered && contextNavigationFiltered.length > 0) {
      let readContextNavigation: any = [last(getContext.context)].find((o: any) => {
        return (
          o.payLoad?.eventName === BC_EVENT_NAMES.NAVIGATION
        );
      });
      if (readContextNavigation) {

        const bcContext: BcContextInput = {
          rootAppName: APP_NAMES.APP_NAME,
          eventName: BC_EVENT_NAMES.HIERARCHY_NODE_CLICK_EVENT,
          orginalBreadcrumbs: readContextNavigation.payLoad.originalBreadcrums,
          body: readContextNavigation.payLoad.body,
          origin: 'icenter',
          selectedVid: this.dataService.selectedVid,
          sortingOrder: ""
        };

        const data = {
          navigationObject: {
            origin: 'icenter',
            mode: 'spa',
            appName: APP_NAMES.APP_NAME
          },
          context: bcContext
        };
        this.contextSharing.writeContext(data);
        this.dataService.setNavigationPayloadContext(readContextNavigation)
      }
      console.log("readContextNavigation", readContextNavigation);
    }


    //Navigation event end

  }

  readContextShare() {
    (window as any).addEventListener('message', (e: any) => {
      if (e.origin !== '' && !isEmpty(e.data) && typeof e.data !== 'object') {
        this.subsribeCnxtEvents();
      }
    });
  }

  setName(data: any) {
    return data;
  }

  public fetchLayoutData(payload: any, eventName: any = null, appOrigin: any = null) {
    const { level, vid } = payload;
    if (
      this.layoutData &&
      level === this.layoutData?.level &&
      vid === this.selectedNode.vid &&
      appOrigin !== APP_NAMES.ASSET_HEIRARCHY
    )
      return;
    this.layoutData = null;
    this.loaderService.showLoader();
    localStorage.setItem('parentLevel', JSON.stringify(payload));
    this.layoutSubscription = this.microAppService.fetchMicroAppLayout(payload).subscribe({
      next: (res: any) => {
        // this.loaderService.hideLoader();
        if (this.microAppService.selectedVid) {
          const filterdasset = res?.assets.filter((item: any) => item.vid === this.microAppService.selectedVid);
          this.microAppService.selectedKPI = filterdasset[0].title;
        }
        this.updateBreadCrumbData(res, eventName, appOrigin);
      },
      error: (err: any) => {
        // this.loaderService.hideLoader();
      }
    });
  }

  updateBreadCrumbData(asset: any, eventName: any = null, rootAppName: string = APP_NAMES.DASHBOARD) {
    const getContext = this.contextSharing.readContext();
    let breadcrumbData = new Array();
    const previousAppId = (window as any).parent['appShell']?.previousAppId;

    if (
      (rootAppName === APP_NAMES.CASE_MANAGEMENT ||
        previousAppId === APP_NAMES.CASE_MANAGEMENT ||
        rootAppName === APP_NAMES.USER_MANAGEMENT ||
        previousAppId === APP_NAMES.USER_MANAGEMENT) &&
      eventName === BC_EVENT_NAMES.HIERARCHY_NODE_CLICK_EVENT
    ) {
      breadcrumbData = last(getContext?.context)?.payLoad?.orginalBreadcrumbs;
    } else if (eventName === BC_EVENT_NAMES.BREAD_CRUMB_CLICK_EVENT) {
      let data: Array<any> = first(getContext?.context)?.payLoad?.body || [];
      let itemClickedIndex = findIndex(data, { vid: asset?.selectedVid });
      if (itemClickedIndex >= 0) breadcrumbData = data.slice(0, itemClickedIndex + 1);
      else {
        breadcrumbData = this.updateBreadCrumbWithDefaultAsset(asset);
        if (breadcrumbData?.length && first(breadcrumbData)?.name === 'Home') breadcrumbData.shift();
      }
    } else if (!getContext?.context) {
      breadcrumbData = this.updateBreadCrumbWithDefaultAsset(asset);
    } else {
      const { fromDate, currentDate } = this.dataService.calculateDateRange(this.dataService.selectedDateRange || '3M');
      breadcrumbData = last(getContext?.context)?.payLoad?.body || [];
      // breadcrumbData = breadcrumbData?.map(u => Object.assign({}, u, {fromDate: new Date(fromDate),toDate:currentDate}));

    }

    if (!breadcrumbData.length) {
      breadcrumbData = this.updateBreadCrumbWithDefaultAsset(asset);
      if (breadcrumbData?.length && first(breadcrumbData)?.name === 'Home') breadcrumbData.shift();
    }
    if (breadcrumbData.length && breadcrumbData.length > 2) {
      if (breadcrumbData?.length && first(breadcrumbData)?.name === 'Home') breadcrumbData.shift();
    }

    if (breadcrumbData.length && breadcrumbData.length === 2 && getContext?.context) {
      if (breadcrumbData?.length && first(breadcrumbData)?.name === 'Home') breadcrumbData.shift();
    }

    breadcrumbData = flatten(new Array(breadcrumbData));
    const bcContext: BcContextInput = {
      rootAppName: APP_NAMES.APP_NAME,
      eventName: BC_EVENT_NAMES.HIERARCHY_NODE_CLICK_EVENT,
      orginalBreadcrumbs: breadcrumbData,
      body: breadcrumbData,
      origin: 'icenter',
      sortingOrder: ""
    };
    const data = {
      navigationObject: {
        origin: 'icenter',
        mode: 'spa',
        appName: APP_NAMES.APP_NAME
      },
      context: bcContext
    };
    this.contextSharing.writeContext(data);
  }

  updateBreadCrumbWithDefaultAsset(asset: any) {
    const { fromDate, currentDate } = this.dataService.calculateDateRange(this.dataService.selectedDateRange || '3M');
    const { selectedVid, selectedTitle, selectedId, level } = asset;
    return [
      {
        name: 'Home',
        icon: 'public',
        key: 'sb--breadcrumbs--item-0',
        id: Math.random()
      },
      {
        name: selectedTitle,
        vid: selectedVid,
        veiwLevel: level,
        assetId: selectedId,
        assetName: selectedTitle,
        fromDate: new Date(fromDate),
        toDate: currentDate,
        id: Math.random()
      }
    ];
  }

}
