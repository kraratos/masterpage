import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroAppLayoutComponent } from "src/layouts/micro-app-layout/microapp-layout.component";


const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'micro-app'
  // },
  // {
  //   path: 'app-master-page',
  //   pathMatch: 'full',
  //   redirectTo: 'master-page'
  // },{
  //   path: 'portal',
  //   pathMatch: 'full',
  //   redirectTo: 'master-page'
  // },
  {
    path: 'portal/app-emonitoring',
    component: MicroAppLayoutComponent,
    loadChildren: () => import(`src/micro-app/microapp.module`).then(({ MicroAppModule }) => MicroAppModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
