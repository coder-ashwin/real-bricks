import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DragDropDirective } from '../drag-drop.directive';

import { AddressModule } from './../address/address.module'

@NgModule({
  declarations: [ProfileComponent, DragDropDirective],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, AddressModule]
})

export class ProfileModule {}