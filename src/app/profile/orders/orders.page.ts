import { Component, OnInit } from '@angular/core';
import { UerOrderServiceService } from '../../services/UserServices/user-order-service.service'
import { filter, map, of, toArray } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: any[] = [
    {
      "_id": 1234,
      "status": "Pending"
    }
  ];
  Orders: any;

  constructor(
    private router: Router,
    private OrderService: UerOrderServiceService
  ) { }

  ngOnInit() {
    this.FetchAllOrdersPlaced();
  }

  FetchAllOrdersPlaced() {
    this.OrderService.GetUserIdOrderByUserId().pipe(
      map(res => res.data)
    ).subscribe(res => {
      // console.log("orders--->"+ JSON.stringify(res.data.orderItems[0].productId));
      console.log(res);

      this.Orders = res;
      // console.log( JSON.stringify(this.Orders) );

    })

  }

  SeeOrderDetails(id:any){
     console.log(id);
     this.router.navigate(['/tabs/profile/orders/order-detail', {data:id}]);
     
  }

}
