import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RangeCustomEvent } from '@ionic/angular';
import { CommenServiceService } from '../../../services/Commen-service.service'
import { exhaustMap, filter, map, of, switchMap } from 'rxjs';
import { KeyValue } from '@angular/common';
import { InfiniteScrollCustomEvent } from '@ionic/angular';




@Component({
  selector: 'app-sub-type1',
  templateUrl: './sub-type1.component.html',
  styleUrls: ['./sub-type1.component.scss'],
})



export class SubType1Component implements OnInit {


  categoryName = '';
  params = '';
  ReceivedFilterData: any;
  ReceivedCategoryData: any;
  ProductCategoryData: any;
  SelectProductCategory: any;

  AllFilterData:any


  selectedValues: { [key: string]: string } = {
    BreedSize: '',
    LifeStage: '',
    brands: '',
    flavor: '',
    vegNonveg: '',
    categoryId: '',
    productCategoryId: '',
    lowestPrice: '0',
    upperPrice: '1000',
  }
  // Object to store selected values

  constructor(private route: ActivatedRoute, private service: CommenServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params['data'];
      this.categoryName = params['name'];
      this.selectedValues['categoryId'] = this.params
      console.log(this.params);

    })
    // call method
    this.DisplaySelectedCategoryData();
    this.displaySelectedproductdata();
    this.showselected;
    this. HitFilterData();
    console.log(this.selectedValues['upperPrice']);
    
    // this.getfilterselectedvalue()

  }

  // below are onpage load methods 
  DisplaySelectedCategoryData() {

    if (this.params) {
      this.service.getCategoryById(this.params).pipe(

      ).subscribe(res => {
        // this.ReceivedFilterData.push(res.data)
        // this.ReceivedCategoryData.push(res) 
        this.ReceivedCategoryData = res
        // console.log(res);
        this.ReceivedFilterData = this.ReceivedCategoryData.filterData

      })
    }
  }

  displaySelectedproductdata() {

    this.service.getProductCategory(this.params).subscribe(res => {
      this.ProductCategoryData = res
      this.SelectProductCategory = this.ProductCategoryData.data
      console.log(this.SelectProductCategory);

    })
  }

  // onpage load methods ends here 

  // below is method is used to iterate object with key, vlaue pair 
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  // below are price range methods 
  onIonChange(ev: Event) {
    const value:any = (ev as RangeCustomEvent).detail.value;
    const multipliedValue = value * 100; // Multiply by 100

    // console.log('ionChange emitted value:', value);
    console.log('Multiplied value:', multipliedValue);
    this.showselected('upperPrice', multipliedValue.toString())
  }


  pinFormatter(value: number) {
    return `${value * 100}`;
  }
  // above are price range methods 



  // below are filter methods 

  getfilterselectedvalue() {
    console.log(this.selectedValues);
  }

  selectproductCategory(event: any) {
    const categoryId = event.detail.value;
    console.log(categoryId);
    this.showselected('productCategoryId', categoryId)
  }

  showselected(key: any, event: any) {
    if (typeof event === 'object') {
      const selectedValue = event.detail.value;
      this.selectedValues[key] = selectedValue;
      // console.log(this.selectedValues);
    } else {
      this.selectedValues[key] = event;
      // console.log(this.selectedValues);
    }
       this. HitFilterData();
  }

  
  HitFilterData (){
    this.service.FilterProduct(this.selectedValues).subscribe((res: {data? : any[] }) => {
      this.AllFilterData = res.data;
      console.log(this.AllFilterData);
    })

  }


}
