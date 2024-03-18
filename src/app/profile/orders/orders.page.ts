import { Component, OnInit } from '@angular/core';
import { UerOrderServiceService } from '../../services/UserServices/user-order-service.service'
import { filter, map, of, toArray } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders:any[] = [
    {
      "_id":1234,
      "status":"Pending"
    }
  ];
  
  constructor(
    private OrderService : UerOrderServiceService
  ) { }

  ngOnInit() {
    this.FetchAllOrdersPlaced();
  }

  FetchAllOrdersPlaced(){
      this.OrderService.GetUserIdOrderByUserId().pipe(
         map(res => res.data.orderItems[0].productId)
      ).subscribe(res => {
      // console.log("orders--->"+ JSON.stringify(res.data.orderItems[0].productId));
      console.log(res);
      let productId = res;
      
      // let innerdata = res.data.orderItems[0]
      // of(innerdata).pipe(
      //   map(innerdata => innerdata.map(innerdata = innerdata.productId))
      // ).subscribe(res => {
      //   console.log(res);
        
      // })
      
      
    })
    
  }

}
