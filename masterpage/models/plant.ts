import { TrainModel } from "./train";

export class PlantModel{
  id:string | undefined;
  projectId: string | undefined;
  trains : TrainModel[] | undefined;
  diplayName :string |undefined;
  gibSerialNos: string[] | undefined;
}
