import { Subject } from 'rxjs';
export interface CacheEntry {
    notifier: Subject<void>;
    token: string;
}

function randomToken(): string {
    try {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        const arr = new Uint32Array(4);
        (crypto?.getRandomValues?.(arr));
        return Array.from(arr || [])
            .map(n => n.toString(16).padStart(8, '0'))
            .join('-') || `${Date.now()}-${Math.random()}`;
    } catch {
        return `${Date.now()}-${Math.random()}`;
    }
}

export function createCacheEntry(): CacheEntry {
    return {
        notifier: new Subject<void>(),
        token: randomToken(),
    };
}


export class DualKeyCache {
    private byKey = new Map<string, Map<string, CacheEntry>>();
    private byToken = new Map<string, { key: string; entry: CacheEntry }>();

    put(key: string, entry: CacheEntry): void {
        // Inserisci in byKey
        let bucket = this.byKey.get(key);
        if (!bucket) {
            bucket = new Map<string, CacheEntry>();
            this.byKey.set(key, bucket);
        }
        bucket.set(entry.token, entry);

        // Inserisci in byToken
        this.byToken.set(entry.token, { key, entry });
    }

    /** Ottieni tutte le entry (token->entry) per una key */
    getBucketByKey(key: string): Map<string, CacheEntry> | undefined {
        return this.byKey.get(key);
    }

    /** Ottieni una entry partendo dal token */
    getByToken(token: string): { key: string; entry: CacheEntry } | undefined {
        return this.byToken.get(token);
    }

    /** Rimuovi e chiudi una entry per token (pulizia totale sui due indici) */
    deleteByToken(token: string): void {
        const found = this.byToken.get(token);
        if (!found) return;

        const { key } = found;
        const bucket = this.byKey.get(key);
        if (bucket) {
            bucket.delete(token);
            if (bucket.size === 0) {
                this.byKey.delete(key);
            }
        }
        this.byToken.delete(token);
    }

    /** Rimuovi tutte le entry per una key (utile per reset globali) */
    deleteAllByKey(key: string): void {
        const bucket = this.byKey.get(key);
        if (!bucket) return;
        for (const token of bucket.keys()) {
            this.byToken.delete(token);
        }
        this.byKey.delete(key);
    }


    
  /**
   * Cancella TUTTE le entry in cache:
   * - emette next() su ogni notifier (per interrompere le richieste in-flight)
   * - opzionalmente complete()
   * - svuota entrambi gli indici (byKey e byToken)
   *
   * @param opts.cancel se true (default), chiama notifier.next() su ogni entry
   * @param opts.complete se true (default), chiude i notifier con .complete()
   * @returns un report con i conteggi delle key/token/entry rimosse
   */
    public deleteAll(opts?: { cancel?: boolean; complete?: boolean }): {
        keys: number;
        tokens: number;
        entries: number;
    } {
        const cancel = opts?.cancel ?? true;
        const complete = opts?.complete ?? true;

        let totalEntries = 0;
        const totalKeys = this.byKey.size;
        const totalTokens = this.byToken.size;

        // Itero prima su byKey per raggiungere tutti i notifier
        for (const [, bucket] of this.byKey) {
            for (const [, entry] of bucket) {
                totalEntries++;
                if (cancel) {
                    // interrompe tutti i takeUntil agganciati
                    entry.notifier.next();
                }
                if (complete && !entry.notifier.closed) {
                    entry.notifier.complete();
                }
            }
        }

        // Svuoto gli indici
        this.byKey.clear();
        this.byToken.clear();

        return {
            keys: totalKeys,
            tokens: totalTokens,
            entries: totalEntries,
        };
    }


    /** Annulla (next) tutte le entry per una key, eccetto eventuali token esclusi */
    cancelAllForKey(key: string, exceptTokens: Set<string> = new Set()): void {
        const bucket = this.byKey.get(key);
        if (!bucket) return;
        for (const [token, entry] of bucket) {
            if (exceptTokens.has(token)) continue;
            entry.notifier.next();
            // complete opzionale: puoi farlo qui o lasciarlo a finalize
            if (!entry.notifier.closed) entry.notifier.complete();
        }
    }

    /** Debug helpers opzionali */
    sizeByKey(key: string): number {
        return this.byKey.get(key)?.size ?? 0;
    }

    hasToken(token: string): boolean {
        return this.byToken.has(token);
    }


    public toString(): string {
        if (this.byKey.size === 0) {
            return '[DualKeyCache] (vuota)';
            // oppure return '' se preferisci stringa vuota.
        }

        const lines: string[] = ['[DualKeyCache]'];
        // Ordino le key per avere output stabile
        const keys = Array.from(this.byKey.keys()).sort();

        for (const key of keys) {
            const bucket = this.byKey.get(key);
            if (!bucket || bucket.size === 0) {
                lines.push(`- key: ${key} (0 entries)`);
                continue;
            }

            // Raccolgo i token, ordinati per createdAt (se disponibile) o alfabetico
            const tokensWithMeta = Array.from(bucket.entries()).map(([token, entry]) => ({
                token
            }));

            const tokenList = tokensWithMeta.map(t => t.token).join(', ');
            lines.push(`- key: ${key}`);
            lines.push(`  tokens(${bucket.size}): [ ${tokenList} ]`);
        }

        return lines.join('\n');
    }

}

