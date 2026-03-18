import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit, AfterViewInit {
  @Input() public cssClassCard: string = '';
  @Input() public hideBorder = false;
  @Input() public assetTooltip: string = '';
  @Input() public cardTitle = '';
  @Input() public cardSubTitle = '';
  @Input() public path = '';
  @Input() public customClassName = '';
  @Input() public cardLock = false;
  @Input() icon: string = '';
  @Input() hideBorderHead: boolean = true;


  constructor(
    private elR: ElementRef,
    private cdR: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.toggleTooltip.bind(this));
    this.cdR.detectChanges();
  }

  ngOnInit() {}

  public toggleTooltip(): boolean {
    const titleElement: HTMLElement = this.elR.nativeElement.querySelector('.bh-card-title.truncated-title');
    const isEllipsisActive = (element: any): any => {
      if (element && element.offsetWidth && element.scrollWidth) {
        return element.offsetWidth < element.scrollWidth;
      } else {
        return;
      }
    };
    if (isEllipsisActive(titleElement)) {
      return true;
    } else {
      return false;
    }
  }
}
