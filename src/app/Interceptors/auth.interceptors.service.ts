import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { StorageServiceService } from '../services/storage-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {

  constructor( private router: Router, private StorageService : StorageServiceService ) { }

  // header = new HttpHeaders({
  //   'content-Type': 'application/json',
  //   'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUyY2EyZWI1YTI2NzY1MTgwZWZiNWQiLCJlbWFpbCI6InRlc3QhYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA5NTQxNzYwLCJleHAiOjE3MDk2MjgxNjB9.RdIADR36oNl7uNVFdKKi2qBDvr21pDcANKmMONuCRHA"
  // })
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("authInterCeptor Called!");

      // const myToken = localStorage.getItem('Token');
   

      // if(!myToken){
      //   this.router.navigate(['/login']);
      // }

      // const req = request.clone({
      //    setHeaders:{
      //     'x-access-token': `${myToken}`
      //    }
      // });

      // below code indicates if the page is not login and other 
      // need to verify if the user is loged in or not
      // if(!req.url.includes('/login') && !req.url.includes('/register')){
      //   return next.handle(req).pipe(catchError((err:HttpErrorResponse) => {
      //     if(err.status === 401){
      //       this.router.navigate(['/login']);
      //     }
      //     return throwError(() => err)
      //   }))

      // }
      return next.handle(request);
  
  }
}
