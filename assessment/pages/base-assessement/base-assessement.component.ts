import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyLevel } from '@bakerhughes-icenter/wd-assessment-lib/lib/interface/response/hierarchy-response';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAssessmentStatusPrivilege } from 'src/interface/assessment';
import { AssessmentStatusPrivilege } from 'src/models/assessment';
import { DataService } from 'src/services/test/data.service';

@Component({
  selector: 'app-base-assessement',
  templateUrl: './base-assessement.component.html',
  styleUrls: ['./base-assessement.component.scss']
})
export class BaseAssessementComponent {
  // FIELDS
  private _assessmentId: number = 1;
  private _hierarchy!: Array<HierarchyLevel>;
  private _isProd: boolean = environment.production;
  private _isColad: boolean = false;
  private _user: string | undefined = undefined;
  private _userDetails: any;
  private _isEditAssessmentPrivilege!: boolean;
  private _assessmentStatusPrivilege: IAssessmentStatusPrivilege = new AssessmentStatusPrivilege();
  private _destroy$: Subject<void> = new Subject();

  // CONSTRUCTOR
  constructor(public dataService: DataService, public route: ActivatedRoute) { }

  // LIFECYCLES
  ngOnInit(): void {
    // this.dataService.hierarchyObservable.subscribe(values => {
    //   this.hierarchy = values;
    // })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // GETTERS / SETTERS
  public get assessmentId(): number {
    return this._assessmentId;
  }
  public set assessmentId(value: number) {
    this._assessmentId = value;
  }
  public get hierarchy(): Array<HierarchyLevel> {
    return this._hierarchy;
  }
  public set hierarchy(value: Array<HierarchyLevel>) {
    this._hierarchy = value;
  }
  public get isProd(): boolean {
    return this._isProd;
  }
  public set isProd(value: boolean) {
    this._isProd = value;
  }
  public get isColad(): boolean {
    return this._isColad;
  }
  public set isColad(value: boolean) {
    this._isColad = value;
  }
  public get user(): string | undefined {
    return this._user;
  }
  public set user(value: string | undefined) {
    this._user = value;
  }
  public get userDetails(): any {
    return this._userDetails;
  }
  public set userDetails(value: any) {
    this._userDetails = value;
  }
  public get isEditAssessmentPrivilege(): boolean {
    return this._isEditAssessmentPrivilege;
  }
  public set isEditAssessmentPrivilege(value: boolean) {
    this._isEditAssessmentPrivilege = value;
  }
  public get assessmentStatusPrivilege(): IAssessmentStatusPrivilege {
    return this._assessmentStatusPrivilege;
  }
  public set assessmentStatusPrivilege(value: IAssessmentStatusPrivilege) {
    this._assessmentStatusPrivilege = value;
  }
  public get destroy$(): Subject<void> {
    return this._destroy$;
  }
  public set destroy$(value: Subject<void>) {
    this._destroy$ = value;
  }
}
