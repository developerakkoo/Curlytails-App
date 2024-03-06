import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubType1Component } from './sub-type1.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SubType1Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SubType1RoutingModule { }
