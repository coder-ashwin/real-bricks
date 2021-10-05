import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Load } from './load.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
declare const M;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0, visibility: 'hidden' })),
      state('true', style({ opacity: 1 })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ]),
    trigger('collapse', [
      state('false', style({ height: 0, overflow: 'hidden', opacity: 0, visibility: 'hidden' })),
      state('true', style({ })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ]),
    trigger('anim1', [
      state('false', style({ transform: 'translateX(-100%)' })),
      state('true', style({ })),
      transition('false => true', animate('500ms ease-in-out')),
      transition('true => false', animate('500ms 150ms ease-in-out'))
    ]),
    trigger('anim2', [
      state('false', style({ left: '150%' })),
      state('true', style({ })),
      transition('false => true', animate('150ms 500ms ease-in-out')),
      transition('true => false', animate('150ms ease-in-out'))
    ]),
    trigger('anim3', [
      state('false', style({ top: '-15%' })),
      state('true', style({ })),
      transition('false => true', animate('150ms 500ms ease-in-out')),
      transition('true => false', animate('150ms ease-in-out'))
    ])
  ]
})

export class AppComponent implements OnInit {
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatus = false;
  public anim = false;
  public timer = 0;
  public inter;
  public otpchk: string;
  public otp: string;
  public verified = "no";
  public login = "login";
  public mobile: string;
  public mobile2: string;
  public mobile3: string;
  public email2: string;
  public password: string;
  public password2: string;
  public confirm: string;
  public route = "home";
  public content = {
    "home": "",
    "process": "<h4>process at Real Bricks</h4><p>We use the help of machinery to make sure that our bricks are uniform<br />in size and are of top grade.</p>",
    "quality": "<h4>Quality</h4><p>Our quality team does an immense inspection of the bricks so produced.<br />The final quality of the bricks are measured on the following three factors.</p>",
    "enquire": "<h4>say hello</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    "order": "<p>Not ordered yet!!!<br />order now</p>",
    "pagenotfound": "",
    "profile": ""
  }

  constructor(public router: Router, public db: AngularFireDatabase, public auth: AngularFireAuth,
    public load: Load, private storage: AngularFireStorage, public http: HttpClient) { 
    window.onkeydown = (evt) => {
      if ((evt.code == "Minus" || evt.code == "Equal") && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
      }
    }

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.anim = false;
        if (["home", "process", "quality", "enquire", "order", "profile", "admin", ""].includes(event.url.replace("/", ""))) {
          document.querySelector("body").style.overflowY = "overlay";
        } else {
          document.querySelector("body").style.overflowY = "hidden";
        }
      }
      if(event instanceof NavigationEnd){
        this.anim = true;
        
        if (event.url.replace("/", "") == "") {
          this.route = "home";
        } else if (["home", "process", "quality", "enquire", "order", "profile", "admin"].includes(event.url.replace("/", ""))) {
          this.route = event.url.replace("/", "");
        } else if (event.url.includes("/admin/") || event.url == "/admin") {
          this.route = "admin"
        } else {
          this.route = "pagenotfound";
        }
        if (["profile", "adm"].includes(this.route) && !this.load.loggedin) {
          this.router.navigateByUrl("/home");
          this.load.show = true;
        }
      }
    });
  }

  ngOnInit(): void { 
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatus = false;
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatus = true;
    }));

    this.auth.signInWithEmailAndPassword("buyrealbricks@gmail.com", "realbricks@220198").then(() => {
      this.load.loaded = true;
      var ref = this.db.object('customers').snapshotChanges().subscribe(action => {
        this.load.customers = action.payload.val();
        ref.unsubscribe();
      });
    });

    var images = new Array();
    for (var i = 0; i < Object.keys(this.content).length; i++) {
      images[i] = new Image();
      images[i].src = "../assets/" + Object.keys(this.content)[i] + ".jpg";
    }
  }

  close(event) {
    var target = event.target || event.srcElement;

    if (target.attributes.id) {
      if (target.attributes.id.nodeValue == "login") {
        this.load.show = false;
        this.reset();
      }
    }
  }

  signin() {
    this.load.loaded = false;

    if (!this.mobile3) {
      M.toast({html: 'Please enter mobile number.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.mobile3.length != 10) {
      M.toast({html: 'Mobile number should be of 10 digits.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.password) {
      M.toast({html: 'Please enter password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!Object.keys(this.load.customers).includes(this.mobile3)) {
      M.toast({html: 'Invalid credentials.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.load.customers[this.mobile3]["password"] != this.password) {
      M.toast({html: 'Invalid credentials.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    if (this.load.customers[this.mobile3]["type"] == "A") {
      this.load.loggedin = true;
      this.router.navigateByUrl("/admin");
      this.load.loaded = true;
      this.load.show = false;
      this.reset();
      M.toast({html: 'Log in successful.', classes: "themeToast"});
    } else if (this.load.customers[this.mobile3]["type"] == "C") {

    } else {
      this.load.loaded = true;
      M.toast({html: 'Only mobile app login for Transporters.', classes: "themeToast"});
    }

    var ref = this.db.object('details/' + this.mobile3).snapshotChanges().subscribe(action => {
      var rec = action.payload.val();
      rec["mobile"] = this.mobile3;
      this.load.user = rec;
      this.load.loggedin = true;
      this.load.loaded = true;
      this.load.show = false;
      this.reset();
      M.toast({html: 'Log in successful.', classes: "themeToast"});

      this.db.object('details/' + this.load.user["mobile"]).snapshotChanges().subscribe(action => {
        var rec = action.payload.val();
        rec["mobile"] = this.load.user["mobile"];
        this.load.user = rec;
            
        if (this.load.user["photo"] != "no") {
          this.storage.ref(this.load.user["mobile"] + "." + this.load.user["photo"]).getDownloadURL().subscribe(url => {
            if (!this.load.src && this.load.src != url) {
              this.load.src = url;
              var elmnt1: any = document.querySelector(".pic > figure");
              var elmnt2: any = document.querySelector("main");
              var elmnt3: any = document.querySelector(".pic > .border");

              if (this.route == "home") {
                elmnt1.style.width = ((parseInt(elmnt2.offsetHeight) / 75) * 60) + "px";
                elmnt3.style.width = ((parseInt(elmnt2.offsetHeight) / 75) * 60) + "px";
              } else {
                elmnt1.style.width = elmnt2.offsetHeight + "px";
                elmnt3.style.width = elmnt2.offsetHeight + "px";
              }
            }
          });
        } else {
          this.load.src = "";
        }
      });

      ref.unsubscribe();
    });
  }

  signup() {
    this.load.loaded = false;

    if (!this.mobile) {
      M.toast({html: 'Please enter mobile number.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.mobile.length != 10) {
      M.toast({html: 'Mobile number should be of 10 digits.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    if (this.verified == "no") {
      this.otpchk = ("" + Math.random()).substring(2, 8);
      this.sendotp('Your OTP is ' + this.otpchk + '.', this.mobile, 1);
      return;
    } else if (this.verified == "inprocess") {
      if (this.timer == 0) {
        M.toast({html: 'OTP has expired. Please resend OTP.', classes: "themeToast"});
      } else {
        if (this.otp != this.otpchk) {
          M.toast({html: 'Invalid OTP. Please check the OTP received.', classes: "themeToast"});
        } else {
          M.toast({html: 'Mobile number verification successful.', classes: "themeToast"});
          this.verified = "yes";
        }
      }
      this.load.loaded = true;
      return;
    }

    if (!this.email2) {
      M.toast({html: 'Please enter email address.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.password2) {
      M.toast({html: 'Please enter password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.password2.length < 8) {
      M.toast({html: 'Password should contain more than 8 characters.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.confirm) {
      M.toast({html: 'Please enter confirm password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.confirm != this.password2) {
      M.toast({html: 'Passwords do not match.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (Object.keys(this.load.customers).includes(this.mobile)) {
      M.toast({html: 'Mobile number already exists.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    if (this.verified == "yes") {
      var em = encodeURIComponent(this.email2).replace(/\./g, '%2E');

      this.db.object("customers/" + this.mobile).set({ password: encodeURIComponent(this.password2) }).then(() => {
        this.db.object("details/" + this.mobile).set({ photo: "no", email: em }).then(() => {
          this.load.user = { email: em, photo: "no", mobile: this.mobile };
          this.load.loggedin = true;
          this.load.loaded = true;
          this.load.show = false;
          this.reset();
          M.toast({html: 'Sign up successful.', classes: "themeToast"});

          this.db.object('details/' + this.load.user["mobile"]).snapshotChanges().subscribe(action => {
            var rec = action.payload.val();
            rec["mobile"] = this.load.user["mobile"];
            this.load.user = rec;
            
            if (this.load.user["photo"] != "no") {
              this.storage.ref(this.load.user["mobile"] + "." + this.load.user["photo"]).getDownloadURL().subscribe(url => {
                if (!this.load.src && this.load.src != url) {
                  this.load.src = url;
                  var elmnt1: any = document.querySelector(".pic > figure");
                  var elmnt2: any = document.querySelector("main");
                  var elmnt3: any = document.querySelector(".pic > .border");

                  if (this.route == "home") {
                    elmnt1.style.width = ((parseInt(elmnt2.offsetHeight) / 75) * 60) + "px";
                    elmnt3.style.width = ((parseInt(elmnt2.offsetHeight) / 75) * 60) + "px";
                  } else {
                    elmnt1.style.width = elmnt2.offsetHeight + "px";
                    elmnt3.style.width = elmnt2.offsetHeight + "px";
                  }
                }
              });
            } else {
              this.load.src = "";
            }
          });
        });
      });
    }
  }

  reset() {
    this.otp = "";
    this.otpchk = "";
    this.verified = "no";
    this.mobile3 = "";
    this.mobile = "";
    this.email2 = "";
    this.password = "";
    this.password2 = "";
    this.mobile2 = "";
    this.confirm = "";
    if (this.inter) {
      clearInterval(this.inter);
    }
  }

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

  order() {
    if (!this.load.loggedin) {
      this.load.show = true;
    } else {
      this.router.navigateByUrl("/order")
    }
  }

  sendotp(message: string, mobile: string, type: number) {
    var httpParams = new HttpParams()
      .set('otp', message)
      .set('mobile', mobile);

    this.http.get('http://realbricks.co.in/api/message.php', { params: httpParams }).subscribe(
      response => {
        if (response.hasOwnProperty("error")) {
          M.toast({html: 'Something went wrong. Please try again later.', classes: "themeToast"});
          console.log(response["error"]);
        } else {
          if (type == 1) {
            M.toast({html: 'OTP has been sent successfully.', classes: "themeToast"});
            this.verified = "inprocess";
            this.timer = 120;
            this.inter = setInterval(() => {
              if (this.timer != 0) {
                this.timer--;
              } else {
                clearInterval(this.inter);
              }
            }, 1000);
          } else {
            M.toast({html: 'Your password has been sent to your registered mobile number.', classes: "themeToast"});
            this.login = 'login'; 
            this.reset();
          }
        }

        this.load.loaded = true;
      }
    );
  }

  time(num: number) {
    var min = '0' + parseInt('' + (num / 60));
    var sec = '' + (num % 60);
    sec = (parseInt(sec) < 10 ? ('0' + sec) : sec);

    return min + ' : ' + sec;
  }

  logout() {
    this.load.loggedin = false;
    this.load.user = {};
    
    if (this.route == "profile") {
      this.router.navigateByUrl("/home");
    }

    M.toast({html: 'Logout successful.', classes: "themeToast"});
  }

  keyPressEnter(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13) {
      this.signin();
    }
  }

  scrl() {
    document.body.scrollTop = 0;
  }

  forgot() {
    this.load.loaded = false;

    if (!this.mobile2) {
      M.toast({html: 'Please enter mobile number.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.mobile2.length != 10) {
      M.toast({html: 'Mobile number should be of 10 digits.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.load.customers[this.mobile2]) {
      M.toast({html: 'Please check your mobile number.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    var password = "Your password is " + decodeURIComponent(this.load.customers[this.mobile2]["password"]) + ".";

    this.sendotp(password, this.mobile2, 2)
  }

  soon() {
    M.toast({html: 'Coming soon.', classes: "themeToast"});
  }
}