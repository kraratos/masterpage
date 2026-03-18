import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'bh-dashboard-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public loader: boolean = false;

  constructor(public loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderState.subscribe(({ show }) => {
      this.loader = show;
    });
  }
}
