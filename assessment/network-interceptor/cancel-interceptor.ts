import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize, Observable, Subject, takeUntil, tap} from 'rxjs';
import { CacheEntry, createCacheEntry } from 'src/models/cache-entry';
import { DataService } from 'src/services/test/data.service';

@Injectable({
  providedIn: 'root'
})
export class CancelNetworkCall implements HttpInterceptor {
  constructor(private dataService: DataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Filtra endpoint
    if (!req.url.includes('/widgetsdata')) {
      return next.handle(req);
    }

    const key = this.getKey(req);

    // 1) Crea entry nuova e mettila SUBITO in cache (entrambi gli indici)
    const myEntry: CacheEntry = createCacheEntry();

    let defaultLog = "CANC-INTERCEPT finalize " + myEntry.token + " key = " + key + "- ";
    console.log(defaultLog)
    console.log(defaultLog, this.dataService.cache.toString())
    // 2) Cancella tutte le richieste precedenti con la stessa key, tranne la nuova
    this.dataService.cache.cancelAllForKey(key, new Set([myEntry.token]));
    this.dataService.cache.put(key, myEntry);

    // 3) takeUntil verso il notifier della mia entry
    return next.handle(req).pipe(
      takeUntil(myEntry.notifier), finalize(() => {
        // 4) Pulizia *solo* della mia entry tramite TOKEN
        this.dataService.cache.deleteByToken(myEntry.token);
        if (!myEntry.notifier.closed) {
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
