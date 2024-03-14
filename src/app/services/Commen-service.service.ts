import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, catchError } from 'rxjs';
import { ErrorServicesService } from '../services/error.services.service'



@Injectable({
  providedIn: 'root'
})
export class CommenServiceService {

  constructor(private http: HttpClient, private errorService: ErrorServicesService) { }

  // header = new HttpHeaders({
  //   'content-Type': 'application/json',
  //   'x-access-token':'Access-Control-Allow-Methods'
  // })

  //home page banner
  getAllBanner(): Observable<any> {
    return this.http.get(`${environment.API_URL}/get-top/banner`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // below banner images TRENDING NOW data
  getTopCategory(): Observable<any> {

    return this.http.get(`${environment.API_URL}/get-Trending/Banner`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // Brows pet types
  getAllCategory(): Observable<any> {
    return this.http.get(`${environment.API_URL}/getAll/category`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // After clicking of specific category in browse pet types
  getCategoryById(Id: any) {
    return this.http.get(`${environment.API_URL}/get/product/categoryId/${Id}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  // filter data on product category basis 
  getProductCategory(productId: any) {
    console.log("product id here --------->" + productId);

    return this.http.get(`${environment.API_URL}/get/productCategory/category/${productId}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  SearchProduct(query: any) {
    console.log("hii");
    return this.http.get(`${environment.API_URL}/search/product?q=${query}`).pipe(
      catchError((err) => {
        return this.errorService.handleError(err);
      })
    );
  }

  FilterProduct(data: any) {

    let {
      BreedSize,
      LifeStage,
      brands,
      flavor,
      vegNonveg,
      categoryId,
      productCategoryId,
      lowestPrice,
      upperPrice } = data

    console.log("filter service hit.." +
      upperPrice
      );


    return this.http.get(`${environment.API_URL}/filter/product/${categoryId}?brand=${brands}&flavor=${flavor}&lifeStage=${LifeStage}&breedSize=${BreedSize}&vegNonVeg=${vegNonveg}&productCategoryId=${productCategoryId}&lowerPrice=${0}&upperPrice=${upperPrice}`)
  }

}
