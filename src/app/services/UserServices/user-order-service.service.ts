import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { ErrorServicesService } from '../error.services.service'
import { Observable, catchError } from 'rxjs';
import { StorageServiceService } from '../storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class UerOrderServiceService {

  constructor(
    private http: HttpClient,
     private errorService: ErrorServicesService,
     private StorageService: StorageServiceService
  ) { }


  
  token = this.StorageService.getDecodedAccessToken()

  PlaceOrder(body:any): Observable<any> {
    console.log( "service body here --> "+ JSON.stringify(body));
    return this.http.post(`${environment.API_URL}/place/order/${this.token.userId}`, {body}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  GetOrderById(orderId :any): Observable<any> {
    // console.log(Id, body);
    return this.http.get(`${environment.API_URL}/get/order/${orderId}`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  GetOrderIdByOrderOrderId(orderId :any): Observable<any> {
    // console.log(Id, body);
    return this.http.get(`${environment.API_URL}/get-orderId/order/${orderId}`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  GetDeliveryStatus(orderId :any): Observable<any> {
    // console.log(Id, body);
    return this.http.get(`${environment.API_URL}/get-DeliveryStatus/order'`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }


  GetUserIdOrderByUserId(): Observable<any> {
    // console.log(Id, body);
    return this.http.get(`${environment.API_URL}/get-userId/order/${this.token.userId}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  UpdateDeliveryStatusByOrderId(orderId:any){
    return this.http.put(`${environment.API_URL}/update/deliveryStatus/${orderId}`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

   CancelOrderByUserId(){
    return this.http.put(`${environment.API_URL}/cancel/order/${this.token.userId}`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
   }

   DeletOrderById(Id:any){
    return this.http.delete(`${environment.API_URL}/delete/order/${Id}`, {}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
   }

  

}
