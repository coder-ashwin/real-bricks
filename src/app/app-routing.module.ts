import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';
import { ProcessRoutingModule } from './process/process-routing.module';
import { QualityRoutingModule } from './quality/quality-routing.module';
import { OrderRoutingModule } from './order/order-routing.module';
import { EnquireRoutingModule } from './enquire/enquire-routing.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { PageNotFoundRoutingModule } from './page-not-found/page-not-found-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pagenotfound'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    ProcessRoutingModule,
    QualityRoutingModule,
    OrderRoutingModule,
    EnquireRoutingModule,
    ProfileRoutingModule,
    AdminRoutingModule,
    PageNotFoundRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }