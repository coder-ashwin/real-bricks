import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddressComponent } from './address.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AddressComponent],
  imports: [CommonModule, FormsModule, AgmCoreModule],
  exports: [AddressComponent]
})

export class AddressModule {}