import { Component, Input, OnChanges, OnInit, SimpleChanges, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RangeCustomEvent } from '@ionic/angular';
import { CommenServiceService } from '../services/Commen-service.service'
import { KeyValue } from '@angular/common';
import { delay, of, tap, toArray } from 'rxjs';
import { UserCartServiceService } from '../services/UserServices/user-cart-service.service'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit, OnChanges {


  @Input() initialData!: any[];
  sendata: any[] = [];

  categoryBadges: any[] = [
    {
      name: 'All',
      isSelected: true
    },
    {
      name: 'Food',
      isSelected: false

    },
    {
      name: 'Treet',
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
      name: 'Bowls',
      isSelected: false

    }


  ]

  categoryName = '';
  params = '';
  ReceivedFilterData: any;
  ReceivedCategoryData: any;
  ProductCategoryData: any;
  SelectProductCategory: any;
  ShowMessage = false;
  loadbar = false
  ShowOnPageData = true
  AllFilterData: any;

  initiallySelectedProductCategoryValue = ''

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

  productQuatity = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  selectProductQuantity = "1"
  TotalCartItems: any;


  constructor(
    private route: ActivatedRoute,
    private service: CommenServiceService,
    private UserCartService: UserCartServiceService,
    private alertController: AlertController
  ) { }


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
    this.getAllCartItem()
    // this.HitFilterData();    
    console.log(this.selectedValues['upperPrice']);

    // this.getfilterselectedvalue()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes here---->");
    console.log(changes['AllFilterData'].firstChange);
  }


  categorySelectEvent(ev: any, i: any) {
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
      this.service.getCategoryById(this.params).subscribe(res => {
        // this.ReceivedFilterData.push(res.data)
        // this.ReceivedCategoryData.push(res) 
        this.ReceivedCategoryData = res
        // console.log("onpage load data here -->" + res);
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
    console.log('Multiplied value:', multipliedValue);
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
    console.log("category Id here" + categoryId);
    // below i have called  show selected as it assign the value to object that well be passed to servive http filter mehtod
    this.showselected('productCategoryId', categoryId)
  }

  showselected(key: any, event: any) {
    console.log("selected mehod hit ....");

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
    // this.HitFilterData();
  }




  getEmittedvalues(item: any) {
    console.log("this is emitted data here ----> " + item);

    this.AllFilterData = item

    if (this.AllFilterData.length > 0) {
      console.log("data is here");
      console.log(item);
      this.ShowMessage = false;
      this.loadbar = false;

    } else if (item.length == 0) {
      console.log("NO data here");
      this.ShowMessage = true;
      this.loadbar = false;
    }


  }

  selectQuantity(event: any) {
    this.selectProductQuantity = event.detail.value
  }

 AddToCart(ProductDetils: any) {
    let body = {
      productId: ProductDetils._id,
      quantity: parseInt(this.selectProductQuantity),
      price: ProductDetils.price
    }

     this.UserCartService.AddToCart(body).subscribe(async res => {
      console.log(res);
      const alert = await this.alertController.create({
        header: ProductDetils.name,
        subHeader: ProductDetils.brand,
        message: 'Item Added to Cart Successfully!.',
        buttons: ['Close'],
      });
  
      await alert.present();

    })

  }

  getAllCartItem() {
    // let token = localStorage.getItem('Token')
      this.UserCartService.getCartByUserId().subscribe(res => {
        this.TotalCartItems = res; // Assign the response to the property
        // console.log('Response Data:', this.TotalCartItems.data.cartItems.length ); 
        console.log(res);
        
      })
  }



}
