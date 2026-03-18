import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Buttons } from '@bakerhughes-icenter/widgets-selector-lib';
import { Subscription } from 'rxjs';
import { ContextSharingService } from 'src/services/context-sharing.service';
import { DataService } from 'src/services/data.service';
import { WidgetsService } from 'src/services/widgets-service';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {

  @Input() fromDate!: Date;
  @Input() currentDate!: Date;
  @Input() layoutData: any;
  @Input() contextLevel: any;
  @Input() dataEmpty: boolean = true;
  @Input() selectedDateRange: string = "3M"
  @Input() currentPage: any;
  @Output() loadedWidgetData: EventEmitter<boolean> = new EventEmitter();
  outputLibrary: any;
  gibAssets: string = '';
  renderTimeline: boolean = false;
  maintenaces: any;
  enableEditSinottico: boolean = false;
  hierachyMeSubscription: Subscription | undefined;
  hiercahcyTHLOad: Subscription | undefined;
  casesPayload: any = { data: [], length: 0 };

  widegtForUserSubcription: Subscription | undefined;
  selectedButton: Buttons | undefined = Buttons.Efficency;
  @Input() widgets: any[] = [];


  constructor(
    public changeDetector: ChangeDetectorRef,
    public dataService: DataService,
    public contextSharing: ContextSharingService,
    private widgetsService: WidgetsService,

  ) { }

  hideData: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (this.widgets.length > 0) {
      this.hideData = false;

    }
    if (changes['currentPage'] && changes['currentPage'].currentValue != changes['currentPage'].previousValue) {
      this.hideData = true;
      if (this.widgets.length > 0) {
        this.widgets.forEach((w: any) => {
          w.showLiveData = false;
        })
      }
    }
  }
  ngOnInit(): void {
    // this.widgetsService.getWidgetsData().subscribe(() => {

    //   this.hideData = false;
    //   this.loadedWidgetData.emit(true);
    //   this.widgets.forEach((w: any) => {
    //     if (w.widgedata && !w.widgedata.error)
    //       w.showLiveData = true;
    //   })
    //   this.changeDetector.detectChanges();
    // })
  }
  ngAfterViewChecked(): void {
  }

  ngOnDestroy(): void {
    this.hideData = true;
    this.widgets = [];
  }

}
