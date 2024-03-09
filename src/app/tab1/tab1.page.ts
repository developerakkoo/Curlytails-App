import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { CommenServiceService } from '../services/Commen-service.service'
import { Router } from '@angular/router'
import { tap } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  swiperModules = [IonicSlides];
  constructor(private CommenService: CommenServiceService, private router: Router) {}

  BannerImg :any[] = []
  TrendingNow :any[] = []
  PetTypes: any[] = []
  searchQuery:any;

  laodingBar = false

  ngOnInit(): void {
   this.getTopBanner();   
   this.getTrendingBanner();
   this.getAllcategory();
  }

  // below method gets all the banner images on first page
  getTopBanner() {
    this.CommenService.getAllBanner().subscribe({
      next:(value:any) => {
        console.log(value);
       this.BannerImg = value.data
      }

    })
  }



  getTrendingBanner(){
    this.CommenService.getTopCategory().subscribe({
    next:(value:any) => {  
          this.TrendingNow = value.data
          // console.log("Trending Banner");
          
          // console.log(this.TrendingNow);
          
      }
    })
  }
 
  // brows pet types
  getAllcategory(){
    this.CommenService.getAllCategory().subscribe({
      next:(value:any) => {
        // console.log("pet types--->"+ JSON.stringify(value));
        this.PetTypes = value.data
        // console.log("Pet types--->"+this.PetTypes);
        
      }
    })
  }

   // After clicking of specific category in browse pet types
  getProductById(id:any){
    // console.log(id);
    
    this.CommenService.getCategoryById(id).subscribe({
      next:(value:any) => {
        // console.log("GET CATEGORY BY ID");
        // console.log(value);
        
      }
    })
  }

  SearchMethod(value:any){
    // console.log(value);
     this.CommenService.SearchProduct(value).subscribe({
      next:(value:any) => {
        // console.log(value);
        
      }
     })
  }

  navigateToPage2(id:any, name:any) {
    // Navigate to Page 2 with a parameter
    console.log(id, name);
    this.router.navigate(['/category', {data: id, name: name}]); // 123 is an example parameter
  }

  navigateToCategoryPage() {
    this.router.navigate(['/tabs/tab2']); // Navigate to the category page
  }

}
