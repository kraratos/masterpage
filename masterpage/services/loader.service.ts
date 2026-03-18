import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  public loaderState = this.loaderSubject.asObservable();
  public loaderCounter = 0;

  hideLoader( force:boolean = false ): void {
    this.loaderCounter -= 1;
    if (this.loaderCounter <= 0 || force) {
      this.loaderSubject.next({ show: false } as LoaderState);
    }
  }

  showLoader(): void {
    this.loaderCounter += 1;
    this.loaderSubject.next({ show: true } as LoaderState);
  }
}

export interface LoaderState {
  show: boolean;
}
