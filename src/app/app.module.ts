import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { ProcessModule } from './process/process.module';
import { QualityModule } from './quality/quality.module';
import { OrderModule } from './order/order.module';
import { EnquireModule } from './enquire/enquire.module';
import { ProfileModule } from './profile/profile.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

import { AdminModule } from './admin/admin.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AgmCoreModule } from '@agm/core';

const firebaseConfig = {
  apiKey: "AIzaSyCtF308FCN83HhYyMn65OCkIynDyQuFcKg",
  authDomain: "real-bricks-12afc.firebaseapp.com",
  projectId: "real-bricks-12afc",
  storageBucket: "real-bricks-12afc.appspot.com",
  messagingSenderId: "251246159004",
  appId: "1:251246159004:web:99d2371f6022e0f068f959"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMOZ8gviFGayZMsr9O4uOVlH1lHfSWK_o'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HomeModule,
    ProcessModule,
    QualityModule,
    OrderModule,
    EnquireModule,
    ProfileModule,
    PageNotFoundModule,
    AdminModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }