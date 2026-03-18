import { MachineModel } from "./machine";
import { TrainModel } from "./train";

export class LineupModel{
  id:string | undefined;
  machines : MachineModel[] | undefined;
  train: TrainModel | undefined;
  name:string |undefined;
  timezoneId:string | undefined
  gibSerialNos: string[] | undefined;
}
