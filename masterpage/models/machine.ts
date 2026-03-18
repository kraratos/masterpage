import { LineupModel } from "./lineup";
import { PlantModel } from "./plant";
import { TrainModel } from "./train";

export class MachineModel{
  id:string | undefined;
  plant: PlantModel | undefined;
  train: TrainModel | undefined;
  lineup: LineupModel | undefined;
  oemSerialNo:string | undefined;
  technologyCodeOg:string | undefined
  equipmentCode:string | undefined
  enabledServices:string[] | undefined;
  gibSerialNo:string|undefined;
}
