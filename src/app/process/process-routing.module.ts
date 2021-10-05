import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './process.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'process',
    component: ProcessComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule {}
