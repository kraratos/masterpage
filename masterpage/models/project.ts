import { PlantModel } from "./plant";

export class ProjectModel{
  id:string | undefined;
  plants : PlantModel[] | undefined;
  customDescription:string |undefined;
  gibSerialNos: string[] | undefined;
}
