import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAddressService {

  constructor( private http: HttpClient ) { }


  getAddress(latitude:number, longitude:number):Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    return new Promise<string>((resolve, reject) => {
      this.http.get(url).toPromise().then((response: any) => {
        if (response.display_name) {
          const address = response.display_name;
          resolve(address);
        } else {
          reject('Failed to fetch address.');
        }
      }).catch(error => {
        reject('Error fetching address: ' + error);
      });
    });
  }

}
