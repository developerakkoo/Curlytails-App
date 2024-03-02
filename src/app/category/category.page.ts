import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categoryBadges:any[] = [
    {
      name:'All',
      isSelected: true
    },
    {
      name: 'Food',
      isSelected: false

    },
    {
      name:'Treet',
      isSelected: false
 
    },
    {
      name: 'Toys',
      isSelected: false

    },
   
    {
      name: 'Grooming',
      isSelected: false

    },
    {
      name:'Bowls',
      isSelected: false

    }

    
  ]
  constructor() { }

  ngOnInit() {
  }


  categorySelectEvent(ev:any, i:any){
    console.log(ev);
    console.log(i);
    for (let index = 0; index < this.categoryBadges.length; index++) {
      var element = document.getElementsByClassName('badge')[index];
    element.classList.remove("active");
      
    }
    var element = document.getElementsByClassName('badge')[i];
    element.classList.toggle("active");
    
    
  }
}
