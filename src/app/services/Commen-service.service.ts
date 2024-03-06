import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../../environments/environment'
import { Observable, catchError } from 'rxjs';
import { ErrorServicesService } from '../services/error.services.service'



@Injectable({
  providedIn: 'root'
})
export class CommenServiceService {

  constructor( private http: HttpClient, private errorService : ErrorServicesService ) { }

  // header = new HttpHeaders({
  //   'content-Type': 'application/json',
  //   'x-access-token':'Access-Control-Allow-Methods'
  // })

   header = new HttpHeaders({
    'content-Type': 'application/json',
    'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUyY2EyZWI1YTI2NzY1MTgwZWZiNWQiLCJlbWFpbCI6InRlc3QhYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA5NTQxNzYwLCJleHAiOjE3MDk2MjgxNjB9.RdIADR36oNl7uNVFdKKi2qBDvr21pDcANKmMONuCRHA"
  })

  //homw page banner
  getAllBanner():Observable<any> {
    return this.http.get( `${environment.API_URL}/get-top/banner`, {headers: this.header}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // below banner images TRENDING NOW data
  getTopCategory():Observable<any> {
    
    return this.http.get( `${environment.API_URL}/get-Trending/Banner`, {headers: this.header}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // Brows pet types
  getAllCategory():Observable<any> {
    
    return this.http.get( `${environment.API_URL}/getAll/category`, {headers: this.header}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // After clicking of specific category in browse pet types
  getCategoryById(Id: any){
    return this.http.get( `${environment.API_URL}/get/product/categoryId/${Id}`, {headers: this.header}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  SearchProduct(query:any){
    console.log("hii");
    return this.http.get( `${environment.API_URL}/search/product?q=${query}`, {headers: this.header}).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  FilterProduct(){
    return this.http.get(`${environment.API_URL}/filter/product/648ae333f492db182c353bc9?brand=Royal Canin&flavor=Chicken &lifeStage=Adult&breedSize=large&vegNonVeg=nonveg&productCategoryId=648b03f75901070bc494f1d0&lowerPrice=0&upperPrice=650`)
  }

}
