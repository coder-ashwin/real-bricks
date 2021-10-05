import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
