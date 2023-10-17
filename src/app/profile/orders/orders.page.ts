import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
