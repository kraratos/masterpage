import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared.module';

import { ComponentLibraryModule } from '@bh-digital-solutions/ui-toolkit-angular/dist/'
import { MicroAppLayoutComponent } from "src/layouts/micro-app-layout/microapp-layout.component";
import {RotorStressAppLibModule} from "@bakerhughes-icenter/rotor-stress-app-lib";
import { APIS } from 'src/services/api/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CancelNetworkCall } from 'src/network-interceptor/cancel-interceptor';
import { NetworkInterceptorModule } from 'src/network-interceptor/network.interceptor.module';


@NgModule({
  declarations: [
    AppComponent,
    MicroAppLayoutComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    ComponentLibraryModule,
    SharedModule,
    AppRoutingModule,
    RotorStressAppLibModule,
    NetworkInterceptorModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
