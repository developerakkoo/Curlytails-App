import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  animateHomeBounce:string = '';
  animateExploreBounce:string = '';
  animateFavBounce:string = '';
  animateProfileBounce:string = '';
  constructor() {}

  animate(name:string){
    console.log(name);
    if(name == 'home'){
      this.animateHomeBounce = "animate__animated animate__bounceIn";
    setTimeout(() =>{
    this.animateHomeBounce = "";

    },1000)
    }

    if(name == 'explore'){
      this.animateExploreBounce = "animate__animated animate__bounceIn";
    setTimeout(() =>{
    this.animateExploreBounce = "";

    },1000)
    }

    if(name == 'favorite'){
      this.animateFavBounce = "animate__animated animate__bounceIn";
    setTimeout(() =>{
    this.animateFavBounce = "";

    },1000)
    }

    if(name == 'profile'){
      this.animateProfileBounce = "animate__animated animate__bounceIn";
    setTimeout(() =>{
    this.animateProfileBounce = "";

    },1000)
    }
  }
}
