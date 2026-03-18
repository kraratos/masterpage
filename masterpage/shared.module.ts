import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { APIS } from "src/services/api/api";
import { HttpClientModule } from '@angular/common/http';
import {RouterLink} from "@angular/router";
import {ComponentLibraryModule} from "@bh-digital-solutions/ui-toolkit-angular/dist";
import {FormsModule} from "@angular/forms";
import { TestComponent } from './pages/test/test.component';
import { MicroAppProjectsRoutingModule } from './micro-app/microapp-routing.module';
import { NetworkInterceptorModule } from './network-interceptor/network.interceptor.module';




@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    ComponentLibraryModule,
    FormsModule
    ],
  exports: [
  ],
  providers: [APIS],
})
export class SharedModule {}
