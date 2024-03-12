import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, catchError } from 'rxjs';
import { ErrorServicesService } from '../services/error.services.service'

@Injectable({
  providedIn: 'root'
})
export class GetCategoryDataService {

  constructor(private http: HttpClient, private errorService: ErrorServicesService) { }



  getAllsubCategory(){
    return this.http.get(`${environment.API_URL}/getAll/subCategory`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getSubCategoryByCategoryId(id:any){
    return this.http.get(`${environment.API_URL}/get/subCategory/category/${id}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }
}
