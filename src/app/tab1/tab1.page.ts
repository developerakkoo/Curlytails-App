import { Component, OnInit,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { CommenServiceService } from '../services/Commen-service.service'
import { Router } from '@angular/router'
import { tap } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  
})
export class Tab1Page implements OnInit {
  swiperModules = [IonicSlides];


  constructor(private CommenService: CommenServiceService, private router: Router) { }

  BannerImg: any[] = []
  TrendingNow: any[] = []
  PetTypes: any[] = []
  searchQuery = "Hinjawadi Phase 2 Pune";

  laodingBar = false

  breakpoints = {
    640: { slidesPerView: 4, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 },
  };
  spaceBetween = {
    640: { spaceBetween: 10 },
    768: { spaceBetween: 40 },
    1024: { spaceBetween: 50 },
  }


  // new design code 
  currentaddress:any;
  n = 3; 

  ngOnInit(): void {
    this.getTopBanner();
    this.getTrendingBanner();
    this.getAllcategory();
  }

  // below method gets all the banner images on first page
  getTopBanner() {
    this.CommenService.getAllBanner().subscribe(
      (res) => {
        console.log(res);
        this.BannerImg = res.data
      },
      (error) => {
        console.log(error);
      }
    )
  }



  getTrendingBanner() {
    this.CommenService.getTopCategory().subscribe({
      next: (value: any) => {
        this.TrendingNow = value.data
      },
      error: (err: any) => {
        console.log(err);

      }
    }
    )
  }

  // brows pet types
  getAllcategory() {
    this.CommenService.getAllCategory().subscribe({
      next: (value: any) => {
        // console.log("pet types--->"+ JSON.stringify(value));
        this.PetTypes = value.data
        // console.log("Pet types--->"+this.PetTypes);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  // After clicking of specific category in browse pet types
  getProductById(id: any) {
    // console.log(id);

    this.CommenService.getCategoryById(id).subscribe({
      next: (value: any) => {
        // console.log("GET CATEGORY BY ID");
        // console.log(value);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  SearchMethod(value: any) {
    // console.log(value);
    this.CommenService.SearchProduct(value).subscribe({
      next: (value: any) => {
        // console.log(value);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  navigateToPage2(id: any, name: any) {
    // Navigate to Page 2 with a parameter
    console.log(id, name);
    this.router.navigate(['/tabs/category', { data: id, name: name }]); // 123 is an example parameter
  }

  navigateToCategoryPage() {
    this.router.navigate(['/tabs/tab2']); // Navigate to the category page
  }

}
