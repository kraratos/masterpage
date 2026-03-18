import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import { BC_EVENT_NAMES } from 'src/enum/bc-event-names.enum';

@Injectable({
  providedIn: 'root'
})
export class ContextSharingService {
constructor(private dataService: DataService) {}
  /**
   *
   *
   * @param {*} value
   * @memberof ContextSharingService
   */
  writeContext(value: any) {
    let event = new CustomEvent('updateContext', {
      detail: value,
      bubbles: true,
      cancelable: true
    });
    window.parent.document.dispatchEvent(event);
  }

  /**
   *
   *
   * @return {*}
   * @memberof ContextSharingService
   */
  readContext() {
    let returnValue: any = {};
    let context: any = {};
    try {
      context = (window as any).getContext();
      console.log("readContext context",context)
    } catch (e) {
      console.log("Error read context",e)
      context = {};
    }
    if (context?.hasOwnProperty('context') && Array.isArray(context.context)) {
      returnValue = context;
      // var navigationContext = context.context.find((o: any) => {
      //   return o.payLoad?.eventName === BC_EVENT_NAMES.NAVIGATION;
      // });
      // if(navigationContext){
      //   //Imposto il contesto
      //   let contextToSet = context.context.find((o: any) => {
      //     return o.payLoad?.eventName === BC_EVENT_NAMES.HIERARCHY_NODE_CLICK_EVENT || BC_EVENT_NAMES.BREAD_CRUMB_CLICK_EVENT;
      //   });
      //   this.writeContext(contextToSet);
      //   this.dataService.setNavigationPayloadContext(navigationContext)
      // }

    }
    return returnValue;
  }
  /**
   * Opens Asset Hirarchy Popup model
   */
  openAssetHirarcy(){
    let p:any = window.parent.document;
    if(p.querySelector(`.pinapp-container`)){
      p.querySelector(`.pinapp-container`).style.display =  'block';
      p.querySelector(`.pinapp-container`).style.width = '600px';
      p.querySelector('.backdrop').style.display = 'block';
    }
  }
}
