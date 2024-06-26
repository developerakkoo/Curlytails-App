import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { ErrorServicesService } from '../services/error.services.service'
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private http: HttpClient, private errorService : ErrorServicesService ) { }

  registerUser(body:any):Observable<any>{
    console.log(body);
    return this.http.post<any>(`${environment.API_URL}/user/singUp/`, body).pipe(
      catchError((err) => {
        return this.errorService.handleError(err)
      }) 
    )
  }

  loginUser(body:any):Observable<any>{
    console.log(body);
    return this.http.post<any>(`${environment.API_URL}/user/login`, body)
    
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
