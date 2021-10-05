import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Load {
    public loaded = false;
    public show = false;
    public showadd = false;
    public showimg = false;
    public loggedin = false;
    public user = {};
    public customers = {};
    public key = new BehaviorSubject<string>("");
    public changeVar = this.key.asObservable();
    public src;

    changeMyVar (message: string) {
        this.key.next(message);
    }
}