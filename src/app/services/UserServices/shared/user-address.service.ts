import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs' 

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  [x: string]: any;

  constructor() { }

  private AddressSubject = new BehaviorSubject<any>({})
  Address$ = this.AddressSubject.asObservable();

  setData(data:any){
    console.log(data);
    
    this.AddressSubject.next(data)
  }

  getData():any {
      return this.AddressSubject.getValue();
  }

}
