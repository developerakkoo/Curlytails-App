import { Component, OnInit } from '@angular/core';
import { UerOrderServiceService } from '../../../services/UserServices/user-order-service.service'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {


  param:any;
  OrdreDetails:any[] = [];

  constructor( private orderservice : UerOrderServiceService,  private route: ActivatedRoute, ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.param = params['data']
      console.log(this.param);
      
    })
    this.fetchOrderDetails()

  }

  fetchOrderDetails(){
    this.orderservice.GetOrderById(this.param).pipe(
      map(res => res.data)
    ).subscribe(res => {
    //  console.log(res);
     this.OrdreDetails.push(res)
     console.log(this.OrdreDetails);
     
    })
  }

  requestOrderRefund(){
    
  }

}
