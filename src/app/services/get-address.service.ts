import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorServicesService } from '../services/error.services.service'
@Injectable({
  providedIn: 'root'
})
export class GetAddressService {

  constructor( private http: HttpClient, private errorService: ErrorServicesService ) { }


  // getAddress(latitude:number, longitude:number):Promise<string> {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  //   return new Promise<string>((resolve, reject) => {
  //     this.http.get(url).toPromise().then((response: any) => {
  //       if (response.display_name) {
  //         const address = response.display_name;
  //         resolve(address);
  //       } else {
  //         reject('Failed to fetch address.');
  //       }
  //     }).catch(error => {
  //       reject('Error fetching address: ' + error);
  //     });
  //   });
  // }

  getAddress(latitude: number, longitude: number): Observable<any>{
        // this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`).pipe(
          catchError((err) => {
            return this.errorService.handleError(err);
          })
        );
  }

  // getAddress(latitude: number, longitude: number): Promise<string> {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  //   return this.http.get(url).toPromise().then((response: any) => {
  //     if (response.display_name) {
  //       const address = response.display_name;
  //       return address;
  //     } else {
  //       throw new Error('Failed to fetch address.');
  //     }
  //   }).catch(error => {
  //     throw new Error('Error fetching address: ' + error.message);
  //   });
  // }

}
