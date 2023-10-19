import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  amount:number = 1200;
  constructor() { }

  ngOnInit() {
  }

  decrementQuantity(){

  }

  incrementQuantity(){
    
  }
}
