import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
