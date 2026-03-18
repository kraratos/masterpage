import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from 'src/services/loader.service';
import { ToasterMessageService } from 'src/services/toaster-message.service';
import { environment } from "src/environments/environment";
import { DataService } from 'src/services/test/data.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkInterceptor implements HttpInterceptor {
  constructor(
    private toaster: ToasterMessageService,
    private loader: LoaderService,
    private dataService: DataService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authToken =  environment.authToken;
    // if (authToken!='') {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${authToken}`
    //     }
    //   });
    // }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status===200) {
          this.loader.hideLoader(true);
        }
      }),
      catchError((error: any) => {
        this.dataService.pageError(true);
        this.loader.hideLoader();
        let errorMessage: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `${error.error.message}`;
          this.toaster.showToasterMessage({ show: true, message: errorMessage, hide: 3000 });
        } else {
          if (error.status < 500) {
            errorMessage = `${error?.error?.errors[0].detail}`;
            this.toaster.showToasterMessage({ show: true, message: errorMessage, hide: 3000 });
          }
        }
        return throwError(() => new Error('Error occured'));
      })
    );
  }
}
