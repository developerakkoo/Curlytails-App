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

  
  header = new HttpHeaders({
    'content-Type': 'application/json',
    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUyY2EyZWI1YTI2NzY1MTgwZWZiNWQiLCJlbWFpbCI6InRlc3QhYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA5NTQxNzYwLCJleHAiOjE3MDk2MjgxNjB9.RdIADR36oNl7uNVFdKKi2qBDvr21pDcANKmMONuCRHA"
  })

  getAllsubCategory(){
    return this.http.get(`${environment.API_URL}/getAll/subCategory`, { headers: this.header }).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  getSubCategoryByCategoryId(id:any){
    return this.http.get(`${environment.API_URL}/get/subCategory/category/${id}`, { headers: this.header }).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }
}
