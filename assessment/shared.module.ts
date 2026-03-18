import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopNavbarComponent,SamplingComponent,NotFoundServicesComponent,DashboardCardComponent,LoaderComponent,ToasterMessageComponent } from "./widgets";
import { APIS } from "src/services/api/api";
import { HttpClientModule } from '@angular/common/http';
import {RouterLink} from "@angular/router";
import {ComponentLibraryModule} from "@bh-digital-solutions/ui-toolkit-angular/dist";
import {FormsModule} from "@angular/forms";
import { AssessmentSearchAppLibModule } from '@bakerhughes-icenter/assessment-search-app-lib';
import { AssessmentLibModule } from '@bakerhughes-icenter/wd-assessment-lib';
import { AssessmentDetailsComponent } from './pages/assessment-details/assessment-details.component';
import { BaseAssessementComponent } from './pages/base-assessement/base-assessement.component';
import { TestComponent } from './pages/test/test.component';



@NgModule({
  declarations: [
    TopNavbarComponent,
    SamplingComponent,
    NotFoundServicesComponent,
    DashboardCardComponent,
    LoaderComponent,
    ToasterMessageComponent,
    BaseAssessementComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    ComponentLibraryModule,
    FormsModule,
    AssessmentSearchAppLibModule,
    AssessmentLibModule,
  ],
  exports: [
    TopNavbarComponent,
    NotFoundServicesComponent,
    DashboardCardComponent,
    LoaderComponent,
    ToasterMessageComponent
  ],
  providers: [APIS],
})
export class SharedModule {}
