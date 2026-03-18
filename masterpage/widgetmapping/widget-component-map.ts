
//import{KpiAxCoEfficiencyComponent} from '@BakerHughes-iCenter/kpisaxcoefficiency-lib';
import { KpiAxCoEfficiencyComponent } from '@bakerhughes-icenter/kpisaxcoefficiency-lib'
import { WidgetCompoenent } from '../interface/widget-compoent-map'
import { TableViewComponent } from '@bakerhughes-icenter/table-view-lib';
import { GaugeWidgetComponent } from '@bakerhughes-icenter/gauge-widget-lib'
import { BarChartComponent } from '@bakerhughes-icenter/bar-chart-lib';
import { TimeseriesGraphComponent } from '@bakerhughes-icenter/timeseries-graph-lib';
import { GenericTimeSerieCompoent } from '@bakerhughes-icenter/generic-timeserie-lib'
import { PemsDetailAppComponent } from '@bakerhughes-icenter/pems-detail-app-lib';
import { PlotlyWdComponent } from '@bakerhughes-icenter/wd-advanced-chart-app-lib';
import { CecoMapComponent } from '@bakerhughes-icenter/ceco-map-app-lib';
import { IconTimelineComponent } from '@bakerhughes-icenter/event-time-lib';
import {HealthStatusOverviewComponent  } from '@bakerhughes-icenter/health-status-overview-app-lib';
import { GraphTableComponent } from '@bakerhughes-icenter/graph-table-lib';
import { ImageNavigationComponent } from '@bakerhughes-icenter/image-navigation-lib';
import { RotorStressAppComponent } from '@bakerhughes-icenter/rotor-stress-app-lib';
import { CecoDetailAppComponent } from '@bakerhughes-icenter/ceco-detail-app-lib';

import{timeseriesGuageComponent} from "@bakerhughes-icenter/timeseries-guage-lib"
import {MOMainPageComponent} from  '@bakerhughes-icenter/mo-main-page-app-lib'
import { MaitenaceOptimizerComponent } from '@bakerhughes-icenter/maintenace-optimizer-lib';
import {AutonomousInspectionComponent} from "@bakerhughes-icenter/autonomous-inspection-app-lib";
/**
 * Enum that map the corresponding id of a widget to  the corresponding Componenent class
 */
export const WidgetsComponentsMapping: WidgetCompoenent[] = [
    {
        id: 93,
        component: TableViewComponent
    },
    {
        id: 95,
        component: TableViewComponent
    },
    {
        id: 94,
        component: BarChartComponent
    },
    {
        id: 96,
        component: GaugeWidgetComponent
    },
    {
        id: 97,
        component: TableViewComponent
    },
    {
        id: 98,
        component: TableViewComponent
    },
    {
        id: 99,
        component: TimeseriesGraphComponent
    },
    {
        id: 100,
        component: IconTimelineComponent
    },
    {
        id: 101,
        component: GraphTableComponent
    },
    {
        id: 102,
        component: TableViewComponent
    },
    {
        id: 103,
        component: TableViewComponent
    },
    {
        id: 104,
        component: TableViewComponent
    },
    {
        id: 107,
        component: BarChartComponent
    },
    {
        id: 108,
        component: TableViewComponent
    },
    {
        id: 105,
        component: BarChartComponent
    },
    {
        id: 106,
        component: BarChartComponent
    },
    {
        id: 109,
        component: GenericTimeSerieCompoent

    },
    {   id: 110,
        component: PemsDetailAppComponent

    },
    {
         id: 111,
         component: GenericTimeSerieCompoent
    },
    {
        id: 112,
         component: TableViewComponent
    },
    {
         id: 113,
         component: PlotlyWdComponent
    },
    {
         id: 114,
         component: GraphTableComponent
    },
    {
         id: 115,
         component: TimeseriesGraphComponent
    },
    {
        id: 116,
        component: TableViewComponent
    },
    {
      id: 117,
      component: TableViewComponent
    },
    {
        id: 119,
        component: TableViewComponent
    },
    {
        id: 120,
        component: TableViewComponent
    },
    {
       id: 121,
        component: PlotlyWdComponent
    },
    {
        id: 122,
        component: BarChartComponent

    },
    {
        id: 123,
        component: HealthStatusOverviewComponent
    },
    {
        id: 124,
        component: CecoMapComponent
    }
    ,
    {
        id: 125,
        component: TableViewComponent
    },
    {
        id: 126,
        component: PlotlyWdComponent
    },
    {
      id: 128,
      component: ImageNavigationComponent
    },
    {
      id: -129,
      component: RotorStressAppComponent
    },
    {
        id: 130,
        component: GraphTableComponent
    },
    {
        id: 131,
        component: GraphTableComponent
    },
    {
        id: 132,
        component: GraphTableComponent
    },
    {
        id: 134,
        component: PlotlyWdComponent
    },
    {
         id: 135,
         component: PlotlyWdComponent
    },
    {
         id: 136,
         component: TimeseriesGraphComponent
    },
    {
        id: 138,
        component: TableViewComponent
    },
    {
        id: 139,
        component: PlotlyWdComponent
    },
    {
        id: 133,
        component: PlotlyWdComponent
    },
    {
        id: 141,
        component: CecoDetailAppComponent
    },
    {
      id: 144,
      component: BarChartComponent
    },
    {
        id: 142,
        component: timeseriesGuageComponent
      },  {
        id: 146,
        component: PlotlyWdComponent
    },
    {
        id: 150,
        component: MOMainPageComponent
    },
    {
      id: 155,
      component: PlotlyWdComponent
    },
    {
      id: 160,
      component: GraphTableComponent
    },
    {
      id: 161,
      component: GraphTableComponent
    },
    {
      id: 169,
      component: TableViewComponent
    },
    {
      id: 170,
      component: TableViewComponent
    },
    {
      id: 171,
      component: TableViewComponent
    },
    {
      id: -332,
      component: AutonomousInspectionComponent
    }
   ];

export { WidgetCompoenent };


