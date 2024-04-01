import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GetproductServiceService } from '../../services/product/getproduct-service.service'
import { UserCartServiceService } from 'src/app/services/UserServices/user-cart-service.service';
import { AlertController } from '@ionic/angular';
import { toArray } from 'rxjs';
@Component({
  selector: 'app-product-detial',
  templateUrl: './product-detial.page.html',
  styleUrls: ['./product-detial.page.scss'],
})
export class ProductDetialPage implements OnInit, AfterViewInit {

  productId:any
  productDetails:any;
  selectProductQuantity = "1"
  productQuatity = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor(
    private ActivateRout: ActivatedRoute,
    private Getproductdetails: GetproductServiceService,
    private UserCartService: UserCartServiceService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.ActivateRout.params.subscribe(params => {
     this.productId = params['data']
     this.getPorductdetailUsingProductId()
    })
    //  call the method
  }

  ngAfterViewInit(): void {
      
  }

  getPorductdetailUsingProductId(){
     this.Getproductdetails.getproductById(this.productId).subscribe(res => {
      this.productDetails = res.data
      console.log(this.productDetails);
      
     })

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

}
