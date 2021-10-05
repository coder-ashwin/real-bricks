import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: 0, overflow: 'hidden', opacity: 0, visibility: 'hidden' })),
      state('true', style({ })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})

export class EnquireComponent {
  public contact = true;
  public name: string;
  public email: string;
  public message: string;
  public gender: string;
  public age: string;
  public field: string;
  public exp: string;

  constructor() { }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  disablePaste(args) {
    args.preventDefault();
  }
}