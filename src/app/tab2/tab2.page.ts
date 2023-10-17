import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  categoryBadges:any[] = [
    {
      name:'All',
      isSelected: true
    },
    {
      name: 'Dog',
      isSelected: false

    },
    {
      name:'Cat',
      isSelected: false
 
    },
    {
      name: 'Pig',
      isSelected: false

    },
    {
      name:'Breed',
      isSelected: false

    },
    {
      name: 'Fish',
      isSelected: false

    },
    {
      name:'Birds',
      isSelected: false

    }

    
  ]
  constructor() {}


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

  openSubCategory(ev:any){
    console.log(ev);
    
    var el = document.getElementsByClassName('categoryWrapper')[0];
    el?.classList.toggle("slide-bck-center");
  }
}
