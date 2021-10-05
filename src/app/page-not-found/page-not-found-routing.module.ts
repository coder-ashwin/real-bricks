import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { DelayResolve } from '../delay.service';

const routes: Routes = [
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent,
    resolve: [DelayResolve]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageNotFoundRoutingModule {}