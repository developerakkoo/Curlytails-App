import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openAddAddressPage(){
    this.router.navigate(['tabs','profile','address', 'add-address'])
  }

}
