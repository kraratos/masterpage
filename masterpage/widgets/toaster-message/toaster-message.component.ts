import { Component, OnInit } from '@angular/core';
import { ToasterMessageService } from 'src/services/toaster-message.service';

@Component({
  selector: 'bh-dashboard-toaster-message',
  templateUrl: './toaster-message.component.html',
  styleUrls: ['./toaster-message.component.scss']
})
export class ToasterMessageComponent implements OnInit {
  public toasterConfig: any = {
    show: false,
    message: ''
  };
  constructor(private toasterMeesageService: ToasterMessageService) {}

  ngOnInit() {
    // this.toasterMeesageService.toasterStateObservable.subscribe(({ show, message }: any) => {
    //   this.toasterConfig.show = show;
    //   this.toasterConfig.message = message;
    // });
  }

  handleCloseToasterMessage() {
    this.toasterMeesageService.hideToasterMessage();
  }
}
