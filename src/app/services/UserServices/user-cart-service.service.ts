import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { ErrorServicesService } from '../error.services.service'
import { Observable, catchError } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { StorageServiceService } from '../storage-service.service'

@Injectable({
  providedIn: 'root'
})
export class UserCartServiceService {

  constructor(private http: HttpClient,
     private errorService: ErrorServicesService,
     private StorageService: StorageServiceService
     ) { }

      token = this.StorageService.getDecodedAccessToken()
  
  // AddToCart(Id:any, body:any): Observable<any> {
  //   // console.log(Id, body);
    
  //   return this.http.post(`${environment.API_URL}/add-to-cart/${Id}`, body).pipe(
  //     catchError((err) => {
  //       return this.errorService.handleError(err);
  //     })
  //   );
  // }

  AddToCart(body:any): Observable<any> {
    // console.log(Id, body);
    return this.http.post(`${environment.API_URL}/add-to-cart/${this.token.userId}`, body).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }



  UpdateToCart(body:any): Observable<any> {
    return this.http.put(`${environment.API_URL}/update/cart/${this.token.userId}`,body,{}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  DeleteToCart(id:any): Observable<any> {
    // console.log(Id);
    console.log("delete method hiit");
    console.log("delete mehod -> 0"+ this.token.userId);
    
  console.log("Deleted cart service log--->"+id);

   let body = {
    productId : [id]
   }
   
    return this.http.delete(`${environment.API_URL}/delete-product/cart/${this.token.userId}`,{ body } ).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getAllToCart(): Observable<any> {
    return this.http.get(`${environment.API_URL}/getAll/cart`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getCartByCartId(): Observable<any> {

    return this.http.get(`${environment.API_URL}/get/cart/${this.token.userId}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getCartByUserId(): Observable<any> {
    // console.log(Id);
    return this.http.get(`${environment.API_URL}/get/cart/user/${this.token.userId}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }




}
