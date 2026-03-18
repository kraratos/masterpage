import { HttpHeaders, HttpClient } from "@angular/common/http";
import { DestroyRef, inject, Injectable } from "@angular/core";

import { async, BehaviorSubject, catchError, forkJoin, from, map, mergeMap, Observable, of, ReplaySubject, shareReplay, Subject, Subscription, switchMap, takeUntil, tap } from "rxjs";

import { clone } from "underscore";

import { DataService } from "./data.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HttpAbstractBackendService } from "../api/abstract/http-abstract-backend.service";
import { CpProxyDataApiService } from "../api/cp-proxy-api.service";
import { MASTERPAGEAPP, Pages, TIMELINE_WIDGETID } from "src/pages/test/test.component";
import { CpDashboardApiService } from "../api/cp-dashboard-api.service";


/**
 * Provide services realted to widgtes engine
 */
@Injectable({
    providedIn: 'root'
})
export class WidgetsService extends HttpAbstractBackendService {

    cpProxyDataService: CpProxyDataApiService;
    cpDashboardApiService: CpDashboardApiService;
    widgetDataReadyOservable: BehaviorSubject<Map<number, WidgetData>> = new BehaviorSubject(new Map());
    sigleWidgetReaday: BehaviorSubject<any> = new BehaviorSubject<any>({});
    layoutDataSingleApp: BehaviorSubject<any> = new BehaviorSubject<any>({});
    displayTimeline: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
    layoutWidgetData: Subject<any> = new Subject<any>();
    widgetData: Subject<any> = new Subject<any>();
    clearWidgetDataRequestSubject: Subject<any> = new Subject<any>();
    widegtForUserSubcription: any;
    widgets: any[] = []
    currentPage: any;
    /**
     * key id of widget , values WidgetDatas
     */
    widgetsMap: Map<number, WidgetData> = new Map();

    constructor(http: HttpClient, public dataService: DataService) {
        super(http);
        this.setApiConfig();
        this.cpProxyDataService = new CpProxyDataApiService(http);
        this.cpDashboardApiService = new CpDashboardApiService(http);
    }

    private setApiConfig() {
        this.baseUrl = '';
    }

    getWidgetsData(): Observable<Map<number, any>> {
        return this.widgetDataReadyOservable.asObservable();
    }


    clearWidgetData() {
        this.clearWidgetDataRequestSubject.next(true);
    }

    getWidgets(): any[] {
        return this.widgets;
    }
    /**
     * tell when single widget data is ready
     * @returns
     */
    getSigleWidgetReadyObservable(): Observable<any> {
        return this.sigleWidgetReaday.asObservable();
    }

    getLayoutDataObservable(): Observable<any> {
        return this.layoutDataSingleApp.asObservable();
    }

    getLayoutWidgetDataObservable(): Observable<any> {
        return this.layoutWidgetData.asObservable();
    }
    getWidgetDataObservable(): Observable<any> {
        return this.widgetData.asObservable();
    }
    setWidgetDataValue(obj: any): void {
        this.widgetData.next(obj);
    }

    preparePage(page: Pages) {
        this.layoutWidgetData.next({
            page,
            selectedDateRange: this.dataService.selectedDateRange,
            selectedVid: "PR_NOBLE"
        });
    }

    updateLayoutWidgetData(
        page: Pages,
        vid: string,
        microappName: string = MASTERPAGEAPP
    ): Observable<any> {

        console.log("TEST WIDGETDATA --> updateLayoutWidgetData", page, vid, microappName)
        this.widgets = [];

        this.widegtForUserSubcription = this.cpDashboardApiService.getWidgetsForUser({
            vid,
            pageName: page,
            microAppName: microappName
        }).pipe(
            map((resp: any) => {
                const result = {
                    page,
                    layoutResponse: resp
                }
                return result;
            }
            ));

        return this.widegtForUserSubcription;
    }

    updateWidgeData( page: Pages, response: any) {

        let vid: string = "PR_NOBLE";
        let dataRange: string = "3M";
        let assetLevel: string = "projects";
        console.log("TEST WIDGETDATA --> updateLayoutWidgetData --> getWidgetsForUser", response)
        console.log("chiamate pending : ", this.dataService.cache.toString())

        if (!response) return;

        this.widgetsMap = new Map();

        this.layoutDataSingleApp.next(response);

        const pageFound = response?.pages?.find((p: any) => p?.name === page);

        const tmpWidgets: any[] = [
            ...(pageFound?.summary ?? [])
        ];
        if (pageFound?.kpi) tmpWidgets.push(pageFound.kpi);

        if (pageFound?.options) {
            this.dataService.setOptionsMicroAppLayoutSubject(pageFound.options);
        }
        const widgets: any[] = tmpWidgets.filter(w => w?.id !== TIMELINE_WIDGETID);

        widgets.forEach(widget => {
            let payload: any = {
                widgetId: widget.id,
                vid,
                dateRange: dataRange,
                level: assetLevel
            };
            if (widget.id === 110) {
                payload = { ...payload, sampling: 'monthly' };
            }

            // inizializza la mappa per il widget
            this.widgetsMap.set(widget.id, {
                id: widget.id,
                layout: widget,
                widgetData: undefined,
                error: undefined
            });

            // esegue la request per il singolo widget
            this.cpProxyDataService.getWidgetData(payload)
                .pipe(
                    map((result: any) => ({ payload, result } as { payload: any; result: any })) // pulizia automatica al destroy del componente/servizio
                )
                .subscribe(({ payload, result }) => {
                    const widgetData = this.widgetsMap.get(payload.widgetId);
                    if (!widgetData) return;

                    if (typeof result?.data === 'string') {
                        widgetData.error = result;
                    } else {
                        widgetData.widgetData = result;
                    }

                    // this.prapareSignelWidgetListForPage(...)
                });
        });

    }
}

export interface WidgetData {
    /**
     * widget id
     */
    id: number,
    /**
     * layout  response information about the wideget
     */
    layout: any,
    /**
     * widget data response ,like applicable machines , gibs, and similar infos
     */
    widgetData: any

    error: any;

}

