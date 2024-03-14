
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { IonRadioGroup, IonRange, IonSelect, RangeCustomEvent } from '@ionic/angular';
import { CommenServiceService } from '../../../services/Commen-service.service'
import { KeyValue } from '@angular/common';
import { delay, tap } from 'rxjs';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent  implements OnInit {

@Output() sendata = new EventEmitter<any>();
@ViewChild('radioGroup1') radioGroup1: IonRadioGroup | undefined
@ViewChild('radioGroup2') radioGroup2: IonRadioGroup | undefined
@ViewChild('priceRange') priceRange: IonRange | undefined;
@ViewChild('selectComponent') selectComponent: IonSelect | undefined;

  categoryName = '';
  params = '';
  ReceivedFilterData: any;
  ReceivedCategoryData: any;
  ProductCategoryData: any;
  SelectProductCategory: any;
  ShowMessage = false;
  loadbar = false
  ShowOnPageData = true
  AllFilterData: any

  
  initiallySelectedProductCategoryValue=''

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


  constructor(
    private route: ActivatedRoute,
    private service: CommenServiceService,
  ) {  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.params = params['data'];
      this.categoryName = params['name'];
      this.selectedValues['categoryId'] = this.params
      console.log("this is param Id--->" + this.params);

    })
    // call method
    this.DisplaySelectedCategoryData();
    this.displaySelectedproductdata();
    this.showselected;
    this.HitFilterData();
    console.log(this.selectedValues['upperPrice']);

    // this.getfilterselectedvalue()
  }




  // below are onpage load methods 
  DisplaySelectedCategoryData() {

    if (this.params) {
      this.service.getCategoryById(this.params).subscribe(res => {
        // this.ReceivedFilterData.push(res.data)
        // this.ReceivedCategoryData.push(res) 
        this.ReceivedCategoryData = res
        console.log("onpage load data here -->" + res);
        this.ReceivedFilterData = this.ReceivedCategoryData.filterData
      })
    }
  }

  // below method provids options to select product category 
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
    const value: any = (ev as RangeCustomEvent).detail.value;
    const multipliedValue = value * 100; // Multiply by 100

    // console.log('ionChange emitted value:', value);
    // console.log('Multiplied value:', multipliedValue);
    // below i have called  show selected as it assign the value to object that well be passed to servive http filter mehtod
    this.showselected('upperPrice', multipliedValue.toString())
  }


  pinFormatter(value: number) {
    return `${value * 100}`;
  }
  // above are price range methods 



  // below are filter methods 

  // just a console log method
  getfilterselectedvalue() {
    console.log(this.selectedValues);
  }


  selectproductCategory(event: any) {
    const categoryId = event.detail.value;
    // console.log("category Id here"+categoryId);
    // below i have called  show selected as it assign the value to object that well be passed to servive http filter mehtod
    this.showselected('productCategoryId', categoryId)
  }

  showselected(key: any, event: any) {
    // console.log("selected mehod hit ....");

    if (typeof event === 'object') {
      const selectedValue = event.detail.value;
      this.selectedValues[key] = selectedValue;
      // console.log(this.selectedValues);
    } else {
      this.selectedValues[key] = event;
      // console.log(this.selectedValues);
    }
    // below i have called  show filter method that initially takes all the
    // values from this.selectedValues = [] and display data on dom
    this.HitFilterData();
  }


  HitFilterData() {
    this.service.FilterProduct(this.selectedValues).pipe(
      tap(res => {
        this.loadbar = true,
          this.ShowMessage = false;
      })
    ).subscribe(
      (res: { data?: any[] }) => {
        this.AllFilterData = res.data;
        this.sendata.emit(this.AllFilterData)

        if(this.AllFilterData.length == 0){
              console.log("The data is not comming!!!");
              
        }

        // if (this.AllFilterData.length > 0) {
        //   // this.ShowOnPageData = true;
        //   this.ShowMessage = false;
        //   this.loadbar = false;
        //   console.log("data found ----> " + this.loadbar);
          
            

        // } else {
        //   // If no search results are found, display "Data not found" message
        //   // this.ShowOnPageData = false;
        //   this.ShowMessage = true;
        //   this.loadbar = false;
        // }

        // console.log(this.AllFilterData);
      }
    )

  }

  deselectOptions(){
    console.log("reset done");
    if(this.radioGroup1 && this.radioGroup2 && this.selectComponent && this.priceRange){
      this.radioGroup1.value = null;
      this.radioGroup2.value = null;
      this.selectComponent.value = null;
      this.priceRange.value = 100
      console.log(this.selectedValues);
      // Reset selectedValues object properties to intial values
   
      this.selectedValues['upperPrice'] = '1000'
      this.selectedValues['BreedSize']= '',
      this.selectedValues['LifeStage']= '',
      this.selectedValues['brands']= '',
      this.selectedValues['flavor']= '',
      this.selectedValues['vegNonveg']= '',
      this.selectedValues['productCategoryId']= '',
      this.HitFilterData()
    }
    
  }

}
