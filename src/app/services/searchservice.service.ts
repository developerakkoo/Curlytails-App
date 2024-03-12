import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, catchError } from 'rxjs';
import { ErrorServicesService } from '../services/error.services.service'

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  constructor(private http: HttpClient, private errorService: ErrorServicesService) { }


  
  AllSearch(searchquery:any){
    return this.http.get(`${environment.API_URL}/search/product?q=${searchquery}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

}
