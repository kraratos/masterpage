import * as _ from "lodash";
import { Component, OnInit } from '@angular/core';
import { ContextSharingService } from "src/services/context-sharing.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MicroAppService } from 'src/services/micro-app.service';
import { KindUserPrivilege } from 'src/enum/role';
import { concatMap, of, take, takeUntil } from 'rxjs';

import { BaseAssessementComponent } from "../base-assessement/base-assessement.component";
import { DataService } from "src/services/test/data.service";


@Component({
  selector: 'app-micro-app',
  templateUrl: './microapp.component.html',
  styleUrls: ['./microapp.component.scss']
})
export class MicroAppComponent extends BaseAssessementComponent {
  // FIELDS
  private _fromDate: string | undefined;
  private _currentDate: string | undefined;
  private _layoutData: any;
  private _contextLevel: any;
  private _dataEmpty: boolean = true;
  
  // CONSTRUCTOR
  constructor(dataService: DataService, route: ActivatedRoute, public router: Router, public microAppService: MicroAppService, public contextSharing: ContextSharingService ) {
    super(dataService, route);    
  }

  // LIFECYCLES
  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      console.log("Dynamic parameter", params);
      if(params['assessmentId']){
        let assessmentId = params['assessmentId'];
         this.router.navigate([`portal/app-assessment/detail/${assessmentId}`], { skipLocationChange: true });
      }
    });

    // this.dataService.userDetailsObservable.subscribe(details => {
    //     if (details && !_.isEmpty(details)) {
    //       this.userDetails = details;
    //       if (this.userDetails.email) {
    //         this.user = this.userDetails.email;
    //       }
    //       let privileges: Array<any> = details.privileges as Array<any>;
    //       if (privileges && !_.isEmpty(privileges)) {
    //         this.assessmentStatusPrivilege.isSubmissionStatus = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.SUBMISSION_STATUS.toString().toLowerCase()));
    //         this.assessmentStatusPrivilege.isCbm = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.CBM.toString().toLowerCase()));
    //         this.assessmentStatusPrivilege.isCpm = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.CPM.toString().toLowerCase()));
    //         this.assessmentStatusPrivilege.attachInternal = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.ATTACH_INTERNAL.toString().toLowerCase()));
    //         this.assessmentStatusPrivilege.attachExternal = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.ATTACH_EXTERNAL.toString().toLowerCase()));
    //       }
    //     }
    // });
  }

  // GETTERS / SETTERS
  public get fromDate(): string | undefined {
    return this._fromDate;
  }
  public set fromDate(value: string | undefined) {
    this._fromDate = value;
  }
  public get currentDate(): string | undefined {
    return this._currentDate;
  }
  public set currentDate(value: string | undefined) {
    this._currentDate = value;
  }
  public get layoutData(): any {
    return this._layoutData;
  }
  public set layoutData(value: any) {
    this._layoutData = value;
  }
  public get contextLevel(): any {
    return this._contextLevel;
  }
  public set contextLevel(value: any) {
    this._contextLevel = value;
  }
  public get dataEmpty(): boolean {
    return this._dataEmpty;
  }
  public set dataEmpty(value: boolean) {
    this._dataEmpty = value;
  }
}
