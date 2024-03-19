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
  body: any;
  TotalpayableAmount = 0

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

    this.body = null

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

    this.body = null

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
    productId: any,
    cartnum: any,
    checkBoxCondition: any
  ) {

    // console.log("cartdata total items " + ToalItems);
    // console.log("cartdata subtotal " + SubTotal);
    // // console.log("cartdata Id " + id);git 
    // console.log("cartItem price " + price),
    // console.log("cartItem quantity " + quantity);
    // console.log("cartItem Id " + cartId);
    // console.log("id from inside product Id " + productId);
    // console.log("cartNumber  "+ cartnum);
    // console.log("checked or not"+ checkBoxCondition.target.checked);


    if (checkBoxCondition.target.checked) {

      // let cartItem = this.cartItems.find(item => item.cartnum === cartnum);
      let cartItemindex = this.cartItems.findIndex(item => item.cartnum === cartnum)
      console.log("condition is true and cart item is -->" + cartItemindex);

      if (cartItemindex !== -1) {
        this.cartItems[cartItemindex].Quantity = quantity
      } else {
        this.cartItems.push({
          cartnum: cartnum,
          ProductId: productId,
          Quantity: quantity,
          price: price,
          _id: cartId
        });
        this.productIds.push([cartnum, cartId]);

      }

    } else {
      // Remove unchecked item from cartItems array
      this.cartItems = this.cartItems.filter(item => item.cartnum !== cartnum);
      // Find the index of the item to remove based on the number
      const index = this.productIds.findIndex(item => item[0] == cartnum);
      if (index !== -1) {
        // Remove the item from productIds array
        this.productIds.splice(index, 1);
      }
    }

    this.body = {
      cartItem: this.cartItems,
      TotalItems:  parseInt(ToalItems),
      Subtotal: parseInt(SubTotal),
      productIds: this.productIds
    }

    this.FindTotalPayableAmount()

    // console.log("body here ---> " + JSON.stringify(this.body));
  }

  FindTotalPayableAmount() {

    // console.log(JSON.stringify(this.body));

    let totalAmount = 0

    for (const key in this.body.cartItem) {
      if (this.body.cartItem.hasOwnProperty(key)) {
        const currentItem = this.body.cartItem[key];

        // Calculate the amount for the current item
        const amount = currentItem.Quantity * currentItem.price;

        // Add the amount to totalAmount
        totalAmount += amount;
      }
    }

    this.TotalpayableAmount = totalAmount

  }


  placeOrder( data:any ) {
    // console.log("order placed method hitt!!"+ this.body['productIds'].length);
   
    if(data == 'puchase Selected'){
      this.OrderService.PlaceOrder(this.body).subscribe(res => {
          console.log(res);
        })
    }else{
      this.OrderService.PlaceOrder(data).subscribe(res => {
          console.log(res);   
        })
    }


    // if (this.body !== undefined && this.body['productIds'].length !== 0) {
    //   console.log("order placed method hitt!!" + JSON.stringify(this.body));
    // } else {
    //   console.log("please select the items to order!!");
    // }
    // this.OrderService.PlaceOrder().subscribe(res => {
    //   console.log(res);

    // })
  }
}
