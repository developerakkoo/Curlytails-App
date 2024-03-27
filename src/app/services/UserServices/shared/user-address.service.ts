import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs' 

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor() { }

  private AddressSubject = new BehaviorSubject<string>('')
  Address$ = this.AddressSubject.asObservable();

  setData(data:string){
    console.log(data);
    
    this.AddressSubject.next(data)
  }

  getData():string {
      return this.AddressSubject.getValue();
  }

}
