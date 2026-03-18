import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextSharingService {

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
    } catch (e) {
      context = {};
    }
    if (context?.hasOwnProperty('context') && Array.isArray(context.context)) {
      returnValue = context;
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
