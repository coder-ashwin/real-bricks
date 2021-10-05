import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EnquireComponent } from './enquire.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'enquire',
    component: EnquireComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquireRoutingModule {}
