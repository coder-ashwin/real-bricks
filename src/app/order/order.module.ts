import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

import { AddressModule } from './../address/address.module'

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, OrderRoutingModule, FormsModule, AddressModule]
})

export class OrderModule {}