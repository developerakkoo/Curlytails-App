import { Component, OnInit } from '@angular/core';
import { UserCartServiceService } from '../../services/UserServices/user-cart-service.service'
import { AlertController } from '@ionic/angular';

import { toArray } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  amount: number = 1200;
  responseData: any;
  constructor( 
     private UserCartService : UserCartServiceService,
     private alertController: AlertController
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
        console.log('Response Data:', this.responseData[0].data.cartItems ); // For debugging
      })
  }

  decrementQuantity(ProductDetils:any) {
    console.log(ProductDetils);
    
    let body = {
      productId :   ProductDetils._id,
      quantity: 1,
      price:ProductDetils.price,
      updateQuantity: true
     }
    this.UserCartService.UpdateToCart(body).subscribe(res => {
      console.log(res);
      this.getAllCartItem()
    })
  }

  incrementQuantity(ProductDetils:any) {
    let body = {
      productId : ProductDetils._id,
      quantity: 1,
      price:ProductDetils.price
     }
    
      this.UserCartService.AddToCart(body).subscribe(res => {
        console.log(res);
        this.getAllCartItem()
      })

  }

  RemoceFromCart(ProductDetils:any){
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
}
