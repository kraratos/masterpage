
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { CacheEntry, createCacheEntry } from 'src/models/cache-entry';
import { DataService } from 'src/services/data.service';

@Injectable()
export class CancelNetworkCall implements HttpInterceptor {
  constructor(private dataService: DataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Filtra endpoint
    if (!req.url.includes('cp-proxy-data-service/v1/widgetsdata')) {
      return next.handle(req);
    }

    const key = this.getKey(req);

    const myEntry: CacheEntry = createCacheEntry();

    let defaultLog = "CANC-INTERCEPT finalize " + myEntry.token + " key = " + key + "- ";
    console.log(defaultLog)
    console.log(defaultLog, this.dataService.cache.toString())
    this.dataService.cache.cancelAllForKey(key, new Set([myEntry.token]));
    console.log(defaultLog, "after cancell all previous key", this.dataService.cache.toString())
      const delayMs = 500;
    const putTimerId = setTimeout(() => {
      this.dataService.cache.put(key, myEntry);
    }, delayMs);
    console.log(defaultLog, "after put in cache", this.dataService.cache.toString())

    return next.handle(req).pipe(
      takeUntil(myEntry.notifier),
      tap({
        subscribe: () => console.debug('[REQ START]', req),
        next: () => console.debug('[REQ NEXT]', req),
        error: (err) => {
          const aborted = err?.name === 'AbortError' || err?.status === 0;
          console.error('[REQ ERROR]', req, aborted ? '(ABORT/CANCEL)' : '', err);
        },
        complete: () => console.debug('[REQ COMPLETE]', req),
      }), finalize(() => {
        console.log(defaultLog, "FINALIZE", this.dataService.cache.toString())
         clearTimeout(putTimerId);
        this.dataService.cache.deleteByToken(myEntry.token);
        console.log(defaultLog, "FINALIZE after delete by token", this.dataService.cache.toString())
        if (!myEntry.notifier.closed) {
          console.log(defaultLog, "FINALIZE complete")
          myEntry.notifier.complete();
        }
      })
    );
  }

  // ===== Helpers per calcolare la key =====

  private getKey(req: HttpRequest<any>): string {
    const method = req.method;
    const url = req.urlWithParams;
    const bodyString = method !== 'GET' ? this.stableStringify(req.body ?? {}) : '';
    const raw = `${method}|${url}|${bodyString}`;
    return this.hashFNV1a(raw);
  }

  // Stable stringify *deep*
  private stableStringify(obj: any): string {
    if (obj === null || obj === undefined) return 'null';
    const t = typeof obj;
    if (t === 'number' || t === 'boolean' || t === 'string') return JSON.stringify(obj);
    if (Array.isArray(obj)) return `[${obj.map(v => this.stableStringify(v)).join(',')}]`;
    const keys = Object.keys(obj).sort();
    return `{${keys.map(k => JSON.stringify(k) + ':' + this.stableStringify(obj[k])).join(',')}}`;
  }

  private hashFNV1a(str: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0;
    }
    return hash.toString(16);
  }
}
