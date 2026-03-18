export * from './cp-dashboard-api.service';
import {CpDashboardApiService} from "./cp-dashboard-api.service";
export * from './cp-proxy-api.service';
import {CpProxyDataApiService} from "./cp-proxy-api.service";
export * from './cp-ums-api.service';
import {CpUserManagementApiService} from "./cp-ums-api.service";
export const APIS = [CpDashboardApiService,CpProxyDataApiService,CpUserManagementApiService];
