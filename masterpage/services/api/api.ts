export * from './example-api.service';
import { DataService } from '../data.service';
import { CpDashboardApiService } from './cp-dashboard-api.service';
import { CpProxyDataApiService } from './cp-proxy-data-api.service';
import { CpUserManagementService } from './cp-usermanagement.service';
export const APIS = [CpDashboardApiService,CpProxyDataApiService,CpUserManagementService];
