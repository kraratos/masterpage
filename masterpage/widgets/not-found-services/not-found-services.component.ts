import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-not-found-services',
  templateUrl: './not-found-services.component.html',
  styleUrls: ['./not-found-services.component.scss']
})
export class NotFoundServicesComponent {
  description: string = 'This application is not applicable for this asset.\n' +
    '    Please select a different asset using the Asset Hierarchy on the left.';
  title: string = 'Service not applicable';
  source: string = 'EmptyBox';
  @Input() set setTitle(title:string) {
    this.title = title;
  }
  @Input() set setDescription(description:string) {
    this.description = description;
  }
  @Input() set setSource(source:string) {
    this.source = source;
  }

}
