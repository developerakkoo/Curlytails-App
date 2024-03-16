import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage-angular'
import * as jwt_decode from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

 

  constructor( private storage: Storage ) { }

    getDecodedAccessToken(): any {
    let token = localStorage.getItem('Token')
    let decode;
    if(token){
       decode = jwtDecode(token)
    }
    if(decode){
       return decode
    }

    return null
    
  }
  
  // getDecodedAccessToken(): any {
  //   let token = localStorage.getItem('Token')
  //   let decode;
  //   if(token){
  //      decode = jwtDecode(token)
  //   }
  //   if(decode){
  //      return decode
  //   }
    
  // }


}
