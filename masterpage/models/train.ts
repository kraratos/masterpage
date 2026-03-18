import { LineupModel } from "./lineup";
import { PlantModel } from "./plant";


export class TrainModel{
  id:string | undefined;
  lineups : LineupModel[] | undefined;
  plant: PlantModel | undefined;
  displayName:string|undefined;
  gibSerialNos: string[] | undefined;
}
