import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RangeCustomEvent } from '@ionic/angular';
import { CommenServiceService } from '../../../services/Commen-service.service'
import { map, of, switchMap } from 'rxjs';
import { KeyValue } from '@angular/common';





@Component({
  selector: 'app-sub-type1',
  templateUrl: './sub-type1.component.html',
  styleUrls: ['./sub-type1.component.scss'],
})



export class SubType1Component implements OnInit {



  params = ''
  ReceivedFilterData: any;
  ReceivedCategoryData: any;

  selectedValues: { [key: string]: string } = {
    BreedSize: '',
    LifeStage: '',
    brands: '',
    flavor: '',
    vegNonveg: '',
    categoryId : '',
    productCategoryId: '',
    lowestPrice: '0',
    upperPrice: '',
  }
  // Object to store selected values

  constructor(private route: ActivatedRoute, private service: CommenServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params['data'];
      this.selectedValues['categoryId'] = this.params
      console.log(this.params);

    })
    // call method
    this.DisplaySelectedCategoryData()
    this.getfilterselectedvalue()

  }

  DisplaySelectedCategoryData() {
    if (this.params) {
      this.service.getCategoryById(this.params).subscribe(res => {
        // this.ReceivedFilterData.push(res.data)
        // this.ReceivedCategoryData.push(res) 
        this.ReceivedCategoryData = res
        this.ReceivedFilterData = this.ReceivedCategoryData.filterData
        console.log(this.ReceivedFilterData);
      })
    }
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  getfilterselectedvalue() {
    console.log(this.selectedValues);
  }

  onIonChange(ev: Event) {
    console.log('ionChange emitted value:', (ev as RangeCustomEvent).detail.value);
    this.selectedValues['upperPrice'] = (ev as RangeCustomEvent).detail.value.toString()
  }
  pinFormatter(value: number) {
    return `${value*100}`;
  }

  showselected(key: any, event: any) {
    const selectedValue = event.detail.value;
    this.selectedValues[key] = selectedValue;

    console.log(this.selectedValues);
  }




}
