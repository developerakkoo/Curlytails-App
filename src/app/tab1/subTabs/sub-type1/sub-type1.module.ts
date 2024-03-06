import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubType1Component } from './sub-type1.component'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubType1RoutingModule } from './sub-type1-routing.module'

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SubType1RoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SubType1Component]
})
export class SubType1Module { }
