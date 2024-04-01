import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs' 

@Injectable({
  providedIn: 'root'
})
export class UserFormDetailsService {

  constructor() { }

  private UserAddressSubject = new BehaviorSubject<any>({})
  Userdetails$ = this.UserAddressSubject.asObservable();

  setData(data:any){
    console.log(data);
    this.UserAddressSubject.next(data)
  }

  getData():any {
      return this.UserAddressSubject.getValue();
  }
}
