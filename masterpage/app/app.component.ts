import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, from, map, mergeMap } from 'rxjs';
import layoutResponse from '../assets/layoutResponse/layoutResponse.json';
import { Pages } from 'src/enum/enums';
import { TIMELINE_WIDGETID } from 'src/constants/constant';
import { DataService } from 'src/services/data.service';
import { CpProxyDataApiService } from 'src/services/api/cp-proxy-data-api.service';


@Component({
  selector: 'app-micro-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Micro App Template';
}
