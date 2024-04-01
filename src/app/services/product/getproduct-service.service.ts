import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { ErrorServicesService } from '../error.services.service'
import { Observable, catchError } from 'rxjs';
import { StorageServiceService } from '../storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class GetproductServiceService {

  constructor(
    private http: HttpClient,
     private errorService: ErrorServicesService,
     private StorageService: StorageServiceService
  ) { }

  token = this.StorageService.getDecodedAccessToken()

  GetAllProduct(): Observable<any> {
    console.log( "service get all produt --> ")
    return this.http.get(`${environment.API_URL}/getAll/product`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getproductById(id:any): Observable<any>{
    console.log(id);
    return this.http.get(`${environment.API_URL}/get/product/${id}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }
}
