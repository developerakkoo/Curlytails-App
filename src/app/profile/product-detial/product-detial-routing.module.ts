import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetialPage } from './product-detial.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetialPageRoutingModule {}
