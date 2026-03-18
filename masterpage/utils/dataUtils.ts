
import { MachineModel } from '../models/machine';
import { LineupModel } from '../models/lineup';
import { PlantModel } from '../models/plant';
import { TrainModel } from '../models/train';
import { ProjectModel } from '../models/project';


import { LEVELS, VID_LEVELS } from 'src/enum/enums';

export class DataUtil {

  public static OUT_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  public static UTC_TIMEZONE = "UTC";
  public static LOCAL_TIMEZONE = "LOCAL";
  constructor() { }
  public static getDateDiffDays(date1: Date, date2: Date): number {


    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }
  public static isValidDate(data: string) {
    var timestamp = Date.parse(data);

    if (isNaN(timestamp) == false) {
      return true;
    }
    return false;

  }

  public static sottraiGiorni(data: Date, giorni: number): Date {
    const millisecondiInUnGiorno = 24 * 60 * 60 * 1000; // Numero di millisecondi in un giorno
    const millisecondiDaSottrarre = giorni * millisecondiInUnGiorno;
    const nuovaDataInMillisecondi = data.getTime() - millisecondiDaSottrarre;

    return new Date(nuovaDataInMillisecondi);
  }
  public static aggiungiGiorni(data: Date, giorni: number): Date {
    const millisecondiInUnGiorno = 24 * 60 * 60 * 1000; // Numero di millisecondi in un giorno
    const millisecondiDaSottrarre = giorni * millisecondiInUnGiorno;
    const nuovaDataInMillisecondi = data.getTime() + millisecondiDaSottrarre;

    return new Date(nuovaDataInMillisecondi);
  }

  static findAllLineup(data: any) {
    let lineups: Array<LineupModel> = [];
    for (var i = 0; i < data.length; i++) {
      let children;
      if (data[i] instanceof ProjectModel) {
        children = data[i].plants;
      } else if (data[i] instanceof PlantModel) {
        children = data[i].trains;
      } else if (data[i] instanceof TrainModel) {
        children = data[i].lineups;
      }

      if (data[i] instanceof LineupModel) {
        lineups.push(data[i]);
      } else if (children && children.length && typeof children == "object") {
        let found = this.findAllLineup(children);
        lineups = lineups.concat(found);
      }
    }
    return lineups;
  }

  static findAllTrains(data: any) {
    let trains: Array<TrainModel> = [];
    for (var i = 0; i < data.length; i++) {
      let children;
      if (data[i] instanceof ProjectModel) {
        children = data[i].plants;
      } else if (data[i] instanceof PlantModel) {
        children = data[i].trains;
      }

      if (data[i] instanceof TrainModel) {
        trains.push(data[i]);
      } else if (children && children.length && typeof children == "object") {
        let found = this.findAllTrains(children);
        trains = trains.concat(found);
      }
    }
    return trains;
  }
  static findAllMachineId(data: any) {
    let macchineAr: Array<MachineModel> = [];
    for (var i = 0; i < data.length; i++) {
      let children;
      if (data[i] instanceof ProjectModel) {
        children = data[i].plants;
      } else if (data[i] instanceof PlantModel) {
        children = data[i].trains;
      } else if (data[i] instanceof TrainModel) {
        children = data[i].lineups;
      }
      else if (data[i] instanceof LineupModel) {
        children = data[i].machines;
      }

      //if (data[i].id === id) {
      if (data[i] instanceof MachineModel) {
        macchineAr.push(data[i]);
        //return macchineAr;
      } else if (children && children.length && typeof children == "object") {
        let found = this.findAllMachineId(children);
        macchineAr = macchineAr.concat(found);
      }
    }
    return macchineAr;
  }

  /***
   * converte una stringa di livello vid MC,PL,PR,TR,.. in valore enum Levels
   * @param vidLevel  livello vid  da covertire senza _
   */
  public static convertVidLevelToLevel(vidLevel: string): LEVELS {
    if (vidLevel == VID_LEVELS.PROJECTS.valueOf()) {
      return LEVELS.PROJECTS;
    } else if (vidLevel == VID_LEVELS.PLANTS.valueOf()) {
      return LEVELS.PLANTS;
    } else if (vidLevel == VID_LEVELS.TRAINS.valueOf()) {
      return LEVELS.TRAINS;
    } else if (vidLevel == VID_LEVELS.LINEUPS.valueOf()) {
      return LEVELS.LINEUPS;
    } else if (vidLevel == VID_LEVELS.MACHINE.valueOf()) {
      return LEVELS.MACHINE;
    }
    return LEVELS.NO_LEVEL_FOUND;
  }


  /**
     * Opens Asset Hirarchy Popup model
     */
  public static openAssetHirarcy() {
    let p: any = window.parent.document;
    p.querySelector('.asset-menu-system1').click();

  }
}

