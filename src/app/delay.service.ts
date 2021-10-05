import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { delay } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class DelayResolve implements Resolve<Observable<any>> {

    constructor() {
    }

    resolve(): any {
        return of('delayed navigation').pipe(delay(1000));
    }
}