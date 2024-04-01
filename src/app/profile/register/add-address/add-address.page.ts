import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { AlertController, ToastController } from '@ionic/angular';
import { GetAddressService } from '../../../services/get-address.service'
import { Router } from '@angular/router';
import { UserAddressService } from '../../../services/UserServices/shared/user-address.service'


// below code is for map marker
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})

export class AddAddressPage implements OnInit {
  map!: L.Map;
  marker!: L.Marker 

  latitue: any | undefined
  longitude: any | undefined
  CurrentAddress: any

  constructor(private address: GetAddressService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private UserAddress: UserAddressService
  ) { }

  ngOnInit() {
    this.getCurrentLocation()
    // this.initMap();
  }

  // initMap() {
  //   this.map = L.map('map').setView([51.505, -0.09], 13);
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  //   }).addTo(this.map);

  //   setTimeout(() => {
  //     this.map.invalidateSize();
  //   }, 1000);
  // }

  async getCurrentLocation() {

    try {
      const coordinates = await Geolocation.getCurrentPosition();

      // console.log(coordinates);
      console.log('Current coordinates:', coordinates.coords.latitude);
      this.latitue = coordinates.coords.latitude
      this.longitude = coordinates.coords.longitude
      // this.map.setView([coordinates.coords.latitude, coordinates.coords.longitude], 13); // Set map center to current coordinates
      // this.marker = L.marker([coordinates.coords.latitude, coordinates.coords.longitude]).addTo(this.map); // Add a marker at current coordinates
    } catch (error) {
      console.error('Error getting current location:', error);
      this.presentAlert();
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Turn On your location',
      buttons: ['ok', 'Cancel'],
    });

    await alert.present();
  }

  getUserAddressAndNavigateToAddressForm() {
    if(this.latitue !== undefined && this.longitude !== undefined){
     this.address.getAddress(this.latitue, this.longitude).subscribe( res => {
       console.log(res.address);
       this.UserAddress.setData(res.address)
     })
     this.router.navigate(['register', 'addressform'])
     // this.router.navigate(['/register'])
    }else{
     this.presentAlert();
    }
 
   }

  navigateToAddressPage() {
    console.log("got to addressform");
    this.router.navigate(['register', 'addressform'])
  }



}
