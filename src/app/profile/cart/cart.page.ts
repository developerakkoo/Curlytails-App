import { Component, OnInit } from '@angular/core';
import { UserCartServiceService } from '../../services/UserServices/user-cart-service.service'
import { AlertController } from '@ionic/angular';
import { UerOrderServiceService } from '../../services/UserServices/user-order-service.service'

import { toArray } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  amount: number = 1200;
  responseData: any;
  selectedItems: any[] = [];
  cartItems: any[] = []
  productIds: any[] = []
  //   {
  //     "cartItems":[    
  //     {
  //       "productId":"65e6ed76c30857417fef25c1",
  //       "quantity": 5,
  //       "price": 3600,
  //       "_id": "65f553e16780ca6309d4f699"
  //     }
  //     ],
  //     "TotalItems":5,
  //     "SubTotal":18000,
  //     "productIds":["65f553e16780ca6309d4f699"]
  // }

  // body = {
  //   cartItems: [{
  //      // below product id from inside product id
  //     ProductId: '',
  //     Quantity:'',
  //     price: '',
  //     // below product id from outside product id
  //     _id: ''
  //   }],
  //   TotalItems: ' ',
  //   Subtotal: ' ',
  //   productIds: []
  // }

  constructor(
    private UserCartService: UserCartServiceService,
    private alertController: AlertController,
    private OrderService: UerOrderServiceService
  ) { }

  ngOnInit() {
    this.getAllCartItem()
  }



  getAllCartItem() {
    // let token = localStorage.getItem('Token')
    this.UserCartService.getCartByUserId().pipe(
      toArray()
    ).subscribe(res => {
      this.responseData = res; // Assign the response to the property
      console.log('Response Data:', this.responseData[0].data); // For debugging
    })
  }

  decrementQuantity(ProductDetils: any) {
    console.log(ProductDetils);

    let body = {
      productId: ProductDetils._id,
      quantity: 1,
      price: ProductDetils.price,
      updateQuantity: true
    }
    this.UserCartService.UpdateToCart(body).subscribe(res => {
      console.log(res);
      this.getAllCartItem()
    })
  }

  incrementQuantity(ProductDetils: any) {
    let body = {
      productId: ProductDetils._id,
      quantity: 1,
      price: ProductDetils.price
    }

    this.UserCartService.AddToCart(body).subscribe(res => {
      console.log(res);
      this.getAllCartItem()
    })

  }

  RemoceFromCart(ProductDetils: any) {
    console.log(ProductDetils);

    let productId = ProductDetils.productId._id

    this.UserCartService.DeleteToCart(productId).subscribe(async res => {
      console.log(res);
      const alert = await this.alertController.create({
        header: ProductDetils.name,
        subHeader: ProductDetils.brand,
        message: 'Item Removed from Cart Successfully!.',
        buttons: ['Close'],
      });

      await alert.present();
      this.getAllCartItem();
    })
  }


  onCheckboxChange(
    ToalItems: any,
    SubTotal: any,
    id: any,
    price: any,
    quantity: any,
    cartId: any,
    productId: any) {

    console.log("cartdata total items " + ToalItems);
    console.log("cartdata subtotal " + SubTotal);
    // console.log("cartdata Id " + id);
    console.log("cartItem price " + price),
    console.log("cartItem quantity " + quantity);
    console.log("cartItem Id " + cartId);
    console.log("id from inside product Id " + productId);

  //  let cartItems: [{
  //     // below product id from inside product id
  //     ProductId: '',
  //     Quantity: '',
  //     price: '',
  //     // below product id from outside product id
  //     _id: ''
  //   }]

    this.cartItems.push({
      ProductId: productId,
      Quantity: quantity,
      price: price,
      _id:cartId
    })

    this.productIds.push(cartId)

    let body = {
      cartItem: this.cartItems,
      TotalItems: ToalItems,
      Subtotal: SubTotal,
      productIds: this.productIds
    }

    console.log( "body here ---> "+ JSON.stringify(body));
    

    // if (item.checked) {
    //   this.selectedItems.push(item);
    // } else {
    //   const index = this.selectedItems.findIndex(selectedItem => selectedItem === item);
    //   if (index !== -1) {
    //     this.selectedItems.splice(index, 1);
    //   }
    // }
    // console.log('Selected Items:', this.selectedItems);
  }


  placeOrder() {
    console.log("order placed method hitt!!");

    this.OrderService.PlaceOrder().subscribe(res => {
      console.log(res);

    })
  }
}
