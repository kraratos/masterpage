import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared.module';
import { MicroAppProjectsRoutingModule } from "./microapp-routing.module"
import {ComponentLibraryModule} from "@bh-digital-solutions/ui-toolkit-angular/dist";



@NgModule({
  declarations: [
  ],
  imports: [CommonModule, SharedModule, MicroAppProjectsRoutingModule, ComponentLibraryModule]
})
export class MicroAppModule { }
