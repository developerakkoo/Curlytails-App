import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoryDataService } from '../services/get-category-data.service'
import { SearchserviceService } from '../services/searchservice.service'
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit  {


  categoryBadges: any[] = [
    {
      name: 'All',
      isSelected: true
    },
    {
      name: 'Dog',
      isSelected: false

    },
    {
      name: 'Cat',
      isSelected: false

    },
    {
      name: 'Pig',
      isSelected: false

    },
    {
      name: 'Breed',
      isSelected: false

    },
    {
      name: 'Fish',
      isSelected: false

    },
    {
      name: 'Birds',
      isSelected: false

    }


  ]
  AllSubCategoryData: any;
  SearchResult:any;
  ShowMessage = false
  ShowOnPageData = true

  constructor(private router: Router, 
    private getAllCategoryService: GetCategoryDataService,
    private searchservice: SearchserviceService
    ) { }

  ngOnInit(): void {
    this.getAllSubCategory();
 
  }

  ngAfterViewInit(): void {
    this.selectTagonload(0);
  }

  selectTagonload(i:any){
    var element = document.getElementsByClassName('badge')[i];
    element.classList.toggle("active");
  }

  categorySelectEvent(ev: any, i: any) {

    console.log(ev);
    console.log(i);
    for (let index = 0; index < this.categoryBadges.length; index++) {
      var element = document.getElementsByClassName('badge')[index];
      element.classList.remove("active");
    }
    this.selectTagonload(i)
    // var element = document.getElementsByClassName('badge')[i];
    // element.classList.toggle("active");
  }



  openSubCategory(ev: any, id:any) {
    console.log(ev, id);
    var el = document.getElementsByClassName('categoryWrapper')[ev];
    el?.classList.toggle("slide-bck-center");
    setTimeout(() => {
      this.router.navigate(['category',{data:id}])
    },1000)
    // this.router.navigate(['category',{data:id}])
  }

//   tap( res => {
//     if(Object.keys(res).length === 0 ){
//       this.ShowMessage = true
//    }else{
//     this.ShowMessage = false
//    }
//   // console.log("result here "+res);
//   })
// ).subscribe(

  // SearchMethod(query:any){
  
  //  let searchdata =  this.searchservice.AllSearch(query).subscribe((res :{searchData?:any[]}) => {
  //     this.SearchResult = res.searchData
  //      if(this.SearchResult.length === 0){
  //         this.ShowMessage = true
  //      }else{
  //       this.ShowMessage = false
  //      }
  //     console.log(this.SearchResult);
  //   })

  // }

  getAllSubCategory() {
    this.getAllCategoryService.getAllsubCategory().subscribe((res: { data?: any[] }) => {
      console.log(res);
      this.AllSubCategoryData = res.data
      this.ShowOnPageData = true;
    })
  }

  // Call this method when performing a search
SearchMethod(query: any) {
  if (query ) {
   
      this.searchservice.AllSearch(query).pipe(delay(1000)).subscribe((res: { searchData?: any[] }) => {
        this.SearchResult = res.searchData;
        // If search results are found, display them and hide on-page data
        if (this.SearchResult.length > 0) {
          this.ShowOnPageData = false;
          this.ShowMessage = false;
        } else {
          // If no search results are found, display "Data not found" message
          this.ShowMessage = true;
        }
        console.log(this.SearchResult);
      });

  } else {
    // If search query is cleared, display on-page data
    this.ShowOnPageData = true;
    this.ShowMessage = false;
  }
}




  navigateToPage2(id:any) {
    // Navigate to Page 2 with a parameter
    console.log(id);
    // this.router.navigate(['/category', {data: id}]); // 123 is an example parameter
  }

  // getSubCategoryByCategoryId(id:any){
  //   this.getAllCategoryService.getSubCategoryByCategoryId(id).subscribe(res => {
  //     console.log(res);
      
  //   })
  // }

 


}
