import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressformPageRoutingModule } from './addressform-routing.module';

import { AddressformPage } from './addressform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddressformPage]
})
export class AddressformPageModule {}
