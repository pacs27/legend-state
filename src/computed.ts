import { synced } from './synced';
import { observable } from './observable';
import { Observable, ObservableReadable } from './observableTypes';

export function computed<T extends ObservableReadable>(compute: () => T | Promise<T>): T;
export function computed<T>(compute: () => T | Promise<T>): Observable<T>;
export function computed<T, T2 = T>(
    compute: (() => T | Promise<T>) | ObservableReadable<T>,
    set: (value: T2) => void,
): Observable<T>;
export function computed<T, T2 = T>(
    compute: (() => T | Promise<T>) | ObservableReadable<T>,
    set?: (value: T2) => void,
): Observable<T> {
    return observable(
        set
            ? synced({
                  get: compute as any,
                  onSet: ({ value }) => set(value as any),
              })
            : compute,
    ) as any;
}
