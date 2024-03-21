import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoryDataService } from '../services/get-category-data.service'
import { SearchserviceService } from '../services/searchservice.service'
import { delay, exhaustMap, map, switchMap, tap } from 'rxjs';
import { CommenServiceService } from '../services/Commen-service.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {


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
  appenddata= {
   name: "All"
  };
  PetTypes: any[] = [];
  AllSubCategoryData: any;
  SearchResult: any;
  ShowMessage = false;
  ShowOnPageData = true;
  test = false

  constructor(private router: Router,
    // below service is to get all different categores dog, cat fish
    private getCategoryService: CommenServiceService,
    // below service is to get all subcategory of category 
    private getAllCategoryService: GetCategoryDataService,
    private searchservice: SearchserviceService,
  ) { }

  ngOnInit(): void {
    this.getAllSubCategory();
    console.log(this.test);
    this.getAllcategory();
    

  }

  ngAfterViewInit(): void {
    this.selectTagonload(0);
  }

  selectTagonload(i: any) {
    console.log("selectTogoload hit ---"+ i);
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



  openSubCategory(ev: any, id: any) {
    console.log(ev, id);
    var el = document.getElementsByClassName('categoryWrapper')[ev];
    el?.classList.toggle("slide-bck-center");
    setTimeout(() => {
      this.router.navigate(['category', { data: id }])
    }, 1000)
    // this.router.navigate(['category',{data:id}])
  }

  // brows pet types
  getAllcategory() {
    this.getCategoryService.getAllCategory().pipe(
      map(res => {
        const modifiedresponse = [this.appenddata, ...res.data];
        return modifiedresponse
      })
    ).subscribe(modifiedresponse => {
      // console.log("pet types--->"+ JSON.stringify(value));
      this.PetTypes = modifiedresponse
      // console.log("Pet types--->"+ this.PetTypes);
    })
  }


  getAllSubCategory() {
    this.getAllCategoryService.getAllsubCategory().subscribe((res: { data?: any[] }) => {
      console.log(res);
      this.AllSubCategoryData = res.data
      console.log(this.AllSubCategoryData);

      this.ShowOnPageData = true;
    })
  }

  // Call this method when performing a search
  SearchMethod(query: any) {
    if (query && query !== 'All') {
      this.getAllCategoryService.getSubCategoryByCategoryId(query).pipe(
        // using tap method show loading untill data is found 
        tap(res => {
          this.test = true
          this.ShowMessage = false;
          console.log("in tap method -->" + this.test);

        }),
        delay(1000)
      ).subscribe((res: { data?: any[] }) => {
        this.SearchResult = res.data;
        // If search results are found, display them and hide on-page data
        // console.log(this.SearchResult);
        
        if (this.SearchResult.length > 0) {
          this.ShowOnPageData = false;
          this.ShowMessage = false;
          this.test = false;
          console.log("data found ----> " + this.test);
        } else {
          // If no search results are found, display "Data not found" message
          this.ShowMessage = true;
          this.ShowOnPageData = false;
          this.test = false;
        }
        console.log(this.SearchResult);
      });

    } else {
      // If search query is cleared, display on-page data
      this.ShowOnPageData = true;
      this.ShowMessage = false;
      this.test = false;
    }
  }




  navigateToPage2(id: any) {
    // Navigate to Page 2 with a parameter
    console.log(id);
    this.router.navigate(['/tabs/category', {data: id}]); // 123 is an example parameter
  }

  // getSubCategoryByCategoryId(id:any){
  //   this.getAllCategoryService.getSubCategoryByCategoryId(id).subscribe(res => {
  //     console.log(res);

  //   })
  // }




}
