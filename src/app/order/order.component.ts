import { Component } from '@angular/core';
import { Load } from '../load.service';
import { Router } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations';
declare const M;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0, visibility: 'hidden' })),
      state('true', style({ opacity: 1 })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})

export class OrderComponent {
  public bload: string;
  public address: string;

  constructor(public router: Router, public load: Load) { }

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

  number(val: string) {
    if (val) {
      return (parseInt(val) * 1000) + " bricks";
    } else {
      return "0 bricks";
    }
  }

  price(val: string) {
    if (val) {
      return (parseInt(val) * 15299);
    } else {
      return "0";
    }
  }

  pay() {
    if (!this.load.loggedin) {
      this.load.show = true;
      M.toast({html: 'Please sign in to continue.', classes: "themeToast"});
      return;
    }
    if (!this.load.user["name"]) {
      this.router.navigateByUrl("/home");
      M.toast({html: 'Please complete your profile to continue.', classes: "themeToast"});
      return;
    }
    if (!this.bload || parseInt(this.bload) == 0) {
      M.toast({html: 'Please enter number of brick loads required.', classes: "themeToast"});
      return;
    }
    if (!this.address) {
      M.toast({html: 'Please choose delivery address.', classes: "themeToast"});
      return;
    }
    
    M.toast({html: 'Coming soon.', classes: "themeToast"});
  }

  length(obj) {
    return obj && Object.keys(obj).length < 3;
  }
}