import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RangeCustomEvent } from '@ionic/angular';
import { CommenServiceService } from '../services/Commen-service.service'
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoryBadges:any[] = [
    {
      name:'All',
      isSelected: true
    },
    {
      name: 'Food',
      isSelected: false

    },
    {
      name:'Treet',
      isSelected: false
 
    },
    {
      name: 'Toys',
      isSelected: false

    },
   
    {
      name: 'Grooming',
      isSelected: false

    },
    {
      name:'Bowls',
      isSelected: false

    }

    
  ]

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
      console.log("this is param Id--->"+this.params);

    })
    // call method
    this.DisplaySelectedCategoryData();
    this.displaySelectedproductdata();
    this.showselected;
    this. HitFilterData();
    console.log(this.selectedValues['upperPrice']);
    
    // this.getfilterselectedvalue()
  }


  categorySelectEvent(ev:any, i:any){
    console.log(ev);
    console.log(i);
    for (let index = 0; index < this.categoryBadges.length; index++) {
      var element = document.getElementsByClassName('badge')[index];
    element.classList.remove("active");
      
    }
    var element = document.getElementsByClassName('badge')[i];
    element.classList.toggle("active");
    
    
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
