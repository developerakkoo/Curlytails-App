import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openPage(page:string){
    if(page == "orders"){

      this.router.navigate(['tabs','profile',page]);
    }
    if(page == "address"){
      this.router.navigate(['tabs','profile',page]);

    }
    if(page == "cart"){
      this.router.navigate(['tabs','profile',page]);

    }
  }
}
