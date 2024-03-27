import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation  } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { AlertController, ToastController } from '@ionic/angular';
import { GetAddressService } from '../../../services/get-address.service'
import { Router } from '@angular/router';
import { UserAddressService } from '../../../services/UserServices/shared/user-address.service'
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})


export class AddAddressPage implements OnInit, AfterViewInit {
  map!: L.Map;
  marker!: L.Marker;

  latitue: any
  longitude: any
  CurrentAddress:any
  
  constructor(private address: GetAddressService,
     private toastController: ToastController,
     private router: Router,
     private alertController: AlertController,
     private UserAddress: UserAddressService
     ) { }

  ngOnInit() {
    this.getCurrentLocation()
    // this.initMap()
  }

  ngAfterViewInit(): void {
    
  }

  // initMap() {
  //   this.map = L.map('map').setView([100, 100], 13); // Initialize the map with a default center and zoom level
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map); // Add a tile layer (OpenStreetMap)
  // }


  async getCurrentLocation() {

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      
        // console.log(coordinates);
        console.log('Current coordinates:', coordinates.coords.latitude);
        this.latitue = coordinates.coords.latitude
       this.longitude = coordinates.coords.longitude
    } catch (error) {
      console.error('Error getting current location:', error);
      this.presentAlert();
    }
  }

   async getUserAddress(){

      const userAddress = await this.address.getAddress(this.latitue, this.longitude);
      console.log(userAddress);
      this.UserAddress.setData(userAddress)
      this.router.navigate(['/register'])
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Turn On your location',
      buttons: ['ok', 'Cancel'],
    });

    await alert.present();
  }

  navigateToAddressPage(){
    console.log("got to addressform");
    this.router.navigate(['register','addressform'])
  }
 
  

}
