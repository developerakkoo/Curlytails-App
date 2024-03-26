import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetialPageRoutingModule } from './product-detial-routing.module';

import { ProductDetialPage } from './product-detial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetialPageRoutingModule
  ],
  declarations: [ProductDetialPage]
})
export class ProductDetialPageModule {}
