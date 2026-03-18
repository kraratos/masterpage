import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, from, iif, map, mergeMap, of, Subject, Subscription, switchMap } from 'rxjs';
import { CpProxyDataApiService } from 'src/services/api/cp-proxy-data-api.service';
import { DataService } from 'src/services/data.service';
import { WidgetsService } from 'src/services/widgets-service';
import layoutResponse from '../../assets/layoutResponse/layoutResponse.json';
import { CpDashboardApiService } from 'src/services/api/cp-dashboard-api.service';
import { MicroAppService } from 'src/services/micro-app.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  currentPage: any = Pages.STRATEGY;
  responselayout: any;
  private destroyRef: DestroyRef = inject(DestroyRef);
  items = [
    { "label": "Strategy", "icon": "emoji_objects", "key": Pages.STRATEGY },
    { "label": "Health", "icon": "speed", "key": Pages.HEALTH },
    { "label": "Efficiency & Emission", "icon": "cloud", "key": Pages.EFFICIENCY },
    { "label": "Unmanning & Remote Engineering", "icon": "settings_remote", "key": Pages.UNMANNING }
  ];


  constructor(public dataService: DataService, private widgetsService: WidgetsService, private cpProxyDataService: CpProxyDataApiService,) { }
  ngOnInit(): void {
  }

  pageSelected($event: any) {

    console.log("click")
    if ($event?.detail?.key == Pages.UNMANNING) {
      this.currentPage = Pages.UNMANNING;

    }
    if ($event?.detail?.key == Pages.HEALTH) {
      this.currentPage = Pages.HEALTH;

    }
    if ($event?.detail?.key == Pages.STRATEGY) {
      this.currentPage = Pages.STRATEGY;

    }
    if ($event?.detail?.key == Pages.EFFICIENCY) {
      this.currentPage = Pages.EFFICIENCY;

    }

    this.dataService.cancelAllPendingRequest()
      this.widgetsService.updateLayoutWidgetData(this.currentPage, "PR_NOBLE").subscribe(
        (response) => {
          this.widgetsService.updateWidgeData(response.page, response.layoutResponse)
        }
      )


  }


}

export const MASTERPAGEAPP = "masterpageapp";
export const TIMELINE_WIDGETID = 100;

export enum Pages {
  HEALTH = 'health',
  EFFICIENCY = "efficiency",
  STRATEGY = 'strategy',
  UNMANNING = "unmanning"
}
