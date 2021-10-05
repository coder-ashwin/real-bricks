import { Component, OnInit } from '@angular/core';
import { Load } from '../load.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { finalize } from 'rxjs/operators';
declare const M;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0, visibility: 'hidden' })),
      state('true', style({ opacity: 1 })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ]),
    trigger('collapseSide1', [
      state('false', style({ width: 0, overflow: 'hidden', opacity: 0, visibility: 'hidden', margin: '0' })),
      state('true', style({ width: '20%', margin: '5px 7.5% 20px 2.5%' })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ]),
    trigger('collapseSide2', [
      state('false', style({ width: '85%', margin: '5px 7.5% 20px' })),
      state('true', style({ width: '60%', margin: '5px 2.5% 20px 7.5%' })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})

export class ProfileComponent implements OnInit {
  public task: AngularFireUploadTask;
  public name: string;
  public email: string;
  public ext: string;
  public gender: string;
  public age: string;
  public mobile: string;
  public edit1: boolean;
  public delete: string;
  public showcon = false;
  public tempsrc;
  public file: File;
  public passcu: string;
  public passne: string;
  public passco: string;

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage, public load: Load) { }

  ngOnInit(): void { 
    this.cancel();
  }

  save() {
    this.load.loaded = false;

    if (!this.name) {
      M.toast({html: 'Please enter name.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.gender) {
      M.toast({html: 'Please enter gender.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.age) {
      M.toast({html: 'Please enter age.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
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

    this.load.user = { name: this.name, gender: this.gender, age: this.age, mobile: this.mobile };
    this.db.object("details/" + this.load.user["email"]).update(this.load.user).then(() => {
      this.load.loaded = true;
      this.edit1 = false;
      M.toast({html: 'Save successful.', classes: "themeToast"});
    });
  }

  cancel() {
    if (this.load.user["name"]) {
      this.name = this.load.user["name"];
    } else {
      this.name = "";
    }
    if (this.load.user["gender"]) {
      this.gender = this.load.user["gender"];
    } else {
      this.gender = "";
    }
    if (this.load.user["age"]) {
      this.age = this.load.user["age"];
    } else {
      this.age = "";
    }
    if (this.load.user["mobile"]) {
      this.mobile = this.load.user["mobile"];
    } else {
      this.mobile = "";
    }
    if (this.load.user["email"]) {
      this.email = decodeURIComponent(this.load.user["email"].replace('%2E', '.'));
    } else {
      this.email = "";
    }
    this.edit1 = true;
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

  length(obj) {
    return obj && Object.keys(obj).length < 3;
  }

  yes() {
    this.load.loaded = false;

    this.db.object("details/" + this.load.user["email"] + "/address/" + this.delete).remove().then(() => {
      this.delete = "";
      this.showcon = false;
      this.load.loaded = true;
      M.toast({html: 'Address deleted successfully.', classes: "themeToast"});
    });
  }

  edit(key) {
    this.load.changeMyVar(key);
    this.load.showadd = true;
  }

  uploadFile(event) {
    this.load.loaded = false;
    this.ext = event[0].name.substring(event[0].name.lastIndexOf('.') + 1);

    if (!["jpg", "png"].includes(this.ext)) {
      M.toast({html: 'Image should be either "jpg" or "png" format.', classes: "themeToast"});
        this.load.loaded = true;
      return;
    }
    if (event[0].size > (1024 * 1024)) {
      M.toast({html: 'Image should be less 1MB in size.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = (_event: any) => {
      const image = new Image();
      image.src = _event.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];

        if (img_height != img_width) {
          M.toast({html: 'Image height should be equal to width (square image).', classes: "themeToast"});
        } else {
          this.file = event[0];
          this.tempsrc = reader.result;
        }

        this.load.loaded = true;
      }
    }
  }

  upload() {
    this.load.loaded = false;

    if (this.load.src) {
      this.storage.storage.refFromURL(this.load.user["email"] + "." + this.load.user["photo"]).delete().then(() => {
        this.db.object('details/' + this.load.user["email"]).update({ photo: "no" }).then(() => {
          this.task = this.storage.upload(this.load.user["email"] + "." + this.ext, this.file);
          this.task.snapshotChanges().pipe(
            finalize(() => {
              this.db.object('details/' + this.load.user["email"]).update({ photo: this.ext }).then(() => {
                M.toast({html: 'Profile picture updated successfully.', classes: "themeToast"});
                this.load.loaded = true;
                this.imgcancel();
              });
            })
          ).subscribe();
        });
      });
    } else {
      this.task = this.storage.upload(this.load.user["email"] + "." + this.ext, this.file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.db.object('details/' + this.load.user["email"]).update({ photo: this.ext }).then(() => {
            M.toast({html: 'Profile picture added successfully.', classes: "themeToast"});
            this.load.loaded = true;
            this.imgcancel();
          });
        })
      ).subscribe();
    }
  }

  imgcancel() {
    this.load.showimg = false;
    this.file = null;
    this.tempsrc = null;
  }

  reset() {
    this.load.loaded = false;

    if (!this.passcu) {
      M.toast({html: 'Please enter current password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.load.customers[this.load.user["email"]] != encodeURIComponent(this.passcu)) {
      M.toast({html: 'Invalid password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.passne) {
      M.toast({html: 'Please enter new password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (!this.passco) {
      M.toast({html: 'Please enter confirm password.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }
    if (this.passne != this.passco) {
      M.toast({html: 'Passwords do not match.', classes: "themeToast"});
      this.load.loaded = true;
      return;
    }

    this.db.object("customers/" + this.load.user["email"]).update({ password: encodeURIComponent(this.passne) }).then(() => {
      this.load.loaded = true;
      M.toast({html: 'Password reset successful.', classes: "themeToast"});
      this.passcu = "";
      this.passne = "";
      this.passco = "";
    });
  }
}