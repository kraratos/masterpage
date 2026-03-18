import * as _ from "lodash";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KindUserPrivilege } from 'src/enum/role';
import { BaseAssessementComponent } from "../base-assessement/base-assessement.component";
import { DataService } from "src/services/test/data.service";


@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.scss']
})
export class AssessmentDetailsComponent extends BaseAssessementComponent {
  // CONSTRUCTOR
  constructor(dataService: DataService, route: ActivatedRoute) {
    super(dataService, route);
  }

  // LIFECYCLES
  override ngOnInit(): void {
    super.ngOnInit();
    // this.dataService.userDetailsObservable.subscribe(details => {
    //   if (details && !_.isEmpty(details)) {
    //     this.userDetails = details;
    //       if (this.userDetails.email) {
    //         this.user = this.userDetails.email;
    //     }
    //     let privileges: Array<any> = details.privileges as Array<any>;
    //     if (privileges && !_.isEmpty(privileges)) {
    //       this.isEditAssessmentPrivilege = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.EDIT_ASSESSMENT.toString().toLowerCase()));
    //       this.assessmentStatusPrivilege.isCbm = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.CBM.toString().toLowerCase()));
    //       this.assessmentStatusPrivilege.isCbmL2 = privileges.some((role: any) => role?.name?.toString().toLowerCase().includes(KindUserPrivilege.CBM_L2.toString().toLowerCase()));          
    //       this.assessmentStatusPrivilege.isCpm = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.CPM.toString().toLowerCase()));
    //       this.assessmentStatusPrivilege.attachInternal = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.ATTACH_INTERNAL.toString().toLowerCase()));
    //       this.assessmentStatusPrivilege.attachExternal = privileges.some((privilege: any) => privilege?.name?.toLowerCase().includes(KindUserPrivilege.ATTACH_EXTERNAL.toString().toLowerCase()));
    //     }
    //   }
    // });

    let assessmentIdFromUrl = this.route.snapshot.paramMap.get('assessmentId');

    this.route.params.subscribe(params => {
      console.log("Received event of navigation setail assessment", params);
      let assessmentId = params['assessmentId'];
      this.assessmentId = Number(assessmentId);
    });

    this.route.queryParams.subscribe(params => {
      console.log("Dinamic parameter", params);
    });

    if (assessmentIdFromUrl) {
      this.assessmentId = Number(assessmentIdFromUrl);
    }
    console.log("static parameter Assessment detail : " + assessmentIdFromUrl)
  }
}
