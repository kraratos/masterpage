import { Component, DestroyRef, inject } from '@angular/core';
import { CpProxyDataApiService } from 'src/services/api/cp-proxy-api.service';
import layoutResponse from '../../assets/layoutResponse/layoutResponse.json';
import { DataService } from 'src/services/test/data.service';
import { WidgetsService } from 'src/services/test/widgets-service';
import { finalize, from, iif, map, mergeMap, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    // this.widgetsService.getLayoutWidgetDataObservable().pipe(
    //   switchMap((LayoutParams: any) =>
    //     iif(
    //       () => { return !!LayoutParams },
    //       this.widgetsService.updateLayoutWidgetData(
    //         LayoutParams?.page,
    //         LayoutParams?.selectedVid
    //       ),
    //       of(null)
    //     )
    //   )
    // )
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log("TEST WIDGETDATA --> getLayoutWidgetDataObservable", response)
    //       if (response) {
    //         this.responselayout = response;
    //         this.widgetsService.setWidgetDataValue(response);
    //       }

    //     },
    //     error: err => console.error('Errore getLayoutWidgetDataObservable', err)
    //   });

    // this.widgetsService.getWidgetDataObservable().pipe().subscribe({
    //   next: (response: any) => {
    //     console.log("TEST WIDGETDATA --> getWidgetDataObservable", response)
    //     if (response) {
    //       this.widgetsService.updateWidgeData(response.page,response.layoutResponse)

    //     }
    //   },
    //   error: err => console.error('Errore getWidgetDataObservable', err)
    // });


    // this.responselayout = layoutResponse;
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

    //this.dataService.cancelAllPendingRequest()
    // setTimeout(() => {
    //   this.widgetsService.updateLayoutWidgetData(this.currentPage,"PR_NOBLE").subscribe(
    //     (response) =>{
    //       this.widgetsService.updateWidgeData(response.page,response.layoutResponse)
    //     }
    //   )
    //   //this.widgetsService.updateWidgeData(this.currentPage,this.responselayout)
    //   //this.prepareWidgetOfPage()
    // }, 0)

  }

    prepareWidgetOfPage() {
    this.widgetsService.preparePage(this.currentPage);
   }

  // updateWidgeData(
  //   page: Pages,

  //   response: any
  // ) {

  //   let vid: string = "PR_NOBLE";
  //   let dataRange: string = "3M";
  //   let assetLevel: string = "projects";
  //   console.log("TEST WIDGETDATA --> updateLayoutWidgetData --> getWidgetsForUser", response)
  //   console.log("chiamate pending : ", this.dataService.cache.toString())

  //   if (!response) return;

  //   this.widgetsService.widgetsMap = new Map();

  //   this.widgetsService.layoutDataSingleApp.next(response);

  //   const pageFound = response?.pages?.find((p: any) => p?.name === page);

  //   const tmpWidgets: any[] = [
  //     ...(pageFound?.summary ?? [])
  //   ];
  //   if (pageFound?.kpi) tmpWidgets.push(pageFound.kpi);

  //   if (pageFound?.options) {
  //     this.dataService.setOptionsMicroAppLayoutSubject(pageFound.options);
  //   }
  //   const widgets: any[] = tmpWidgets.filter(w => w?.id !== TIMELINE_WIDGETID);

  //           widgets.forEach(widget => {
  //           let payload: any = {
  //               widgetId: widget.id,
  //               vid,
  //               dateRange: dataRange,
  //               level: assetLevel
  //           };
  //           if (widget.id === 110) {
  //               payload = { ...payload, sampling: 'monthly' };
  //           }

  //           // inizializza la mappa per il widget
  //             this.widgetsService.widgetsMap.set(widget.id, {
  //               id: widget.id,
  //               layout: widget,
  //               widgetData: undefined,
  //               error: undefined
  //           });

  //           // esegue la request per il singolo widget
  //           this.cpProxyDataService.getWidgetData(payload)
  //               .pipe(
  //                   map((result: any) => ({ payload, result } as { payload: any; result: any })) // pulizia automatica al destroy del componente/servizio
  //               )
  //               .subscribe(({ payload, result }) => {
  //                   const widgetData =   this.widgetsService.widgetsMap.get(payload.widgetId);
  //                   if (!widgetData) return;

  //                   if (typeof result?.data === 'string') {
  //                       widgetData.error = result;
  //                   } else {
  //                       widgetData.widgetData = result;
  //                   }

  //                   // this.prapareSignelWidgetListForPage(...)
  //               });
  //       });

  //   // from(widgets).pipe(
  //   //   mergeMap(widget => {
  //   //     let payload: any = {
  //   //       widgetId: widget.id,
  //   //       vid,
  //   //       dateRange: dataRange,
  //   //       level: assetLevel
  //   //     };
  //   //     if (widget.id === 110) {
  //   //       payload = { ...payload, sampling: 'monthly' };
  //   //     }

  //   //     // inizializza lo slot in mappa PRIMA della chiamata
  //   //     this.widgetsService.widgetsMap.set(widget.id, {
  //   //       id: widget.id,
  //   //       layout: widget,
  //   //       widgetData: undefined,
  //   //       error: undefined
  //   //     });
  //   //     return this.cpProxyDataService.getWidgetData(payload).pipe(
  //   //       map((result: any) => ({ payload, result } as { payload: any; result: any })),
  //   //       finalize(() => console.debug('[CP-PROXY-REQ FINALIZE]', payload))
  //   //     );
  //   //   })
  //   // ).pipe(takeUntilDestroyed(this.destroyRef))
  //   //   .subscribe((value) => {
  //   //     const { payload, result } = value as { payload: any; result: any };
  //   //     // aggiorna la mappa in base alla risposta
  //   //     const widgetData = this.widgetsService.widgetsMap.get(payload.widgetId);
  //   //     if (widgetData) {
  //   //       if (typeof result?.data === 'string') {
  //   //         widgetData.error = result;
  //   //       } else {
  //   //         widgetData.widgetData = result;
  //   //       }
  //   //     }
  //   //   })

  // }

}

export const MASTERPAGEAPP = "masterpageapp";
export const TIMELINE_WIDGETID = 100;

export enum Pages {
  HEALTH = 'health',
  EFFICIENCY = "efficiency",
  STRATEGY = 'strategy',
  UNMANNING = "unmanning"
}
