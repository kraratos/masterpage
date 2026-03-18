import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroAppComponent } from 'src/pages';
import { AssessmentDetailsComponent } from 'src/pages/assessment-details/assessment-details.component';
import { TestComponent } from 'src/pages/test/test.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: TestComponent
  },
  {
    path: 'detail/:assessmentId',
    component: AssessmentDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroAppProjectsRoutingModule {}
