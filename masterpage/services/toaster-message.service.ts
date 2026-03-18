import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {
  private toasterSubject = new Subject<ToasterState>();
  public toasterStateObservable = this.toasterSubject.asObservable();

  showToasterMessage(config: ToasterState) {
    config = Object.assign(config, { show: true });
    this.toasterSubject.next(config);
    if(config.hide){
      setTimeout(() => {
        this.hideToasterMessage();
      }, config.hide);
    }
  }

  hideToasterMessage() {
    this.toasterSubject.next({ show: false });
  }
}

export interface ToasterState {
  show: boolean;
  message?: string;
  hide?: number;
}
