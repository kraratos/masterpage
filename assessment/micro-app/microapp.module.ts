import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared.module';
import { MicroAppComponent } from "src/pages";
import { MicroAppProjectsRoutingModule } from "./microapp-routing.module"
import {ComponentLibraryModule} from "@bh-digital-solutions/ui-toolkit-angular/dist";
import { AssessmentSearchAppLibModule } from '@bakerhughes-icenter/assessment-search-app-lib';
import { AssessmentLibModule } from '@bakerhughes-icenter/wd-assessment-lib';
import { AssessmentDetailsComponent } from 'src/pages/assessment-details/assessment-details.component';


@NgModule({
  declarations: [
    MicroAppComponent,
    AssessmentDetailsComponent
  ],
  imports: [CommonModule, SharedModule, MicroAppProjectsRoutingModule, ComponentLibraryModule,AssessmentSearchAppLibModule,
    AssessmentLibModule,]
})
export class MicroAppModule { }
