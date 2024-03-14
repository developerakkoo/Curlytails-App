import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { FilterComponent} from '../components/FilterComonent/filter/filter.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CategoryPage ,FilterComponent]
})
export class CategoryPageModule {}
