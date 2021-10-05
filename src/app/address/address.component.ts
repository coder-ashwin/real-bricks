import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Load } from '../load.service';
import { AngularFireDatabase } from '@angular/fire/database';
declare const M;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit, OnDestroy {
  public site: string;
  public line1: string;
  public line2: string;
  public district: string;
  public state: string;
  public pincode: string;
  public zoom: number = 3;
  public lat: number = 23.1255872;
  public lng: number = 79.4894539;
  public marker = {};
  public mapClickListener;

  constructor(public db: AngularFireDatabase, public load: Load, public zone: NgZone) { }

  public ngOnInit(): void { 
    this.load.changeVar.subscribe((message) => {
      if (message) {
        this.site = this.load.user["address"][message]["site"];
        this.line1 = this.load.user["address"][message]["line1"];
        this.line2 = this.load.user["address"][message]["line2"];
        this.district = this.load.user["address"][message]["district"];
        this.state = this.load.user["address"][message]["state"];
        this.pincode = this.load.user["address"][message]["pincode"];
        this.marker = {
          lat: this.load.user["address"][message]["lat"],
          lng: this.load.user["address"][message]["lng"]
        };
        this.lat = this.load.user["address"][message]["lat"];
        this.lng = this.load.user["address"][message]["lng"];
        this.zoom = 13;
      } else {
        this.site = "";
        this.line1 = "";
        this.line2 = "";
        this.district = "";
        this.state = "";
        this.pincode = "";
        this.marker = {};
        this.zoom = 3;
        this.lat = 23.1255872;
        this.lng = 79.4894539;
      }
    });
  }

  public mapReady(map: google.maps.Map): void {
    this.mapClickListener = map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        this.marker = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
      });
    });
  }

  submit() {
    this.load.loaded = false;

    if (!this.site) {
      M.toast({html: 'Please enter site name.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.line1) {
      M.toast({html: 'Please enter address line1.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.line2) {
      M.toast({html: 'Please enter address line2.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.district) {
      M.toast({html: 'Please enter district.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.state) {
      M.toast({html: 'Please enter state.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.pincode) {
      M.toast({html: 'Please enter pincode.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (Object.keys(this.marker).length === 0) {
      M.toast({html: 'Please choose location the map.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    
    if (this.load.key) {
      this.db.object("details/" + this.load.user["email"] + "/address/" + this.load.key).update({
        site: this.site,
        line1: this.line1,
        line2: this.line2,
        district: this.district,
        state: this.state,
        pincode: this.pincode,
        lat: this.marker["lat"],
        lng: this.marker["lng"]
      }).then(() => {
        this.load.loaded = true;
        M.toast({html: 'Address updated successfully.', classes: "themeToast"});
        this.can();
      });
    } else {
      this.db.list("details/" + this.load.user["email"] + "/address").push({
        site: this.site,
        line1: this.line1,
        line2: this.line2,
        district: this.district,
        state: this.state,
        pincode: this.pincode,
        lat: this.marker["lat"],
        lng: this.marker["lng"]
      }).then(() => {
        this.load.loaded = true;
        M.toast({html: 'Address added successfully.', classes: "themeToast"});
        this.can();
      });
    }
  }

  can() {
    this.site = "";
    this.line1 = "";
    this.line2 = "";
    this.district = "";
    this.state = "";
    this.pincode = "";
    this.load.changeMyVar("");
    this.load.showadd = false;
    this.marker = {};
  }

  ngOnDestroy(): void { 
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length !== 0));
  }

  current() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 13;
      });
    }
    else {
        M.toast({html: 'Geolocation is not supported by this browser.', classes: "themeToast"});
    }
  }
}