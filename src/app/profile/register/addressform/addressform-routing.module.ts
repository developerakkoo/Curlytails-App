import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressformPage } from './addressform.page';

const routes: Routes = [
  {
    path: '',
    component: AddressformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressformPageRoutingModule {}
