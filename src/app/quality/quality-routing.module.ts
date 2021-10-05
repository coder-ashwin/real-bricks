import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QualityComponent } from './quality.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'quality',
    component: QualityComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule {}
