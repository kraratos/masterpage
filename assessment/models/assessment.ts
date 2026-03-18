import { IAssessmentStatusPrivilege } from "src/interface/assessment";


export class AssessmentStatusPrivilege implements IAssessmentStatusPrivilege {
    isCbm: boolean = false;
    isCbmL2: boolean = false;
    isCpm: boolean = false;
    isSubmissionStatus: boolean = false;
    attachInternal: boolean = false;
    attachExternal: boolean = false;

    constructor() { }
}
