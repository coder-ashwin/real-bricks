import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EnquireRoutingModule } from './enquire-routing.module';
import { EnquireComponent } from './enquire.component';

@NgModule({
  declarations: [EnquireComponent],
  imports: [CommonModule, EnquireRoutingModule, FormsModule]
})

export class EnquireModule {}