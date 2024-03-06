
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServicesService {

  constructor() { }

  Error = {
    register_success:`Registered Successfully`,
    login_err:`Incorrect Details`,
    login_success:`Login  Successfully`,
    unauthorize:`Unauthorized!`,
    forbidden:`You are Logged Out! Please Login again.`,
    update_user:`Data Updated Successfully`,
    delete:`Data Deleted Successfully`,
    fetch:`Data Fetched Successfully`,
    not_found:`Data Not Exist`,
    data_exist:`Data Already Exist`,
    phone_err:`Phone Number Not verified`,
    email_err:`Email Address Not verified`,
    unknown:'Something Went Wrong!',
    not_registered:'Your Phone number does not exist!',
    registration_incomplete:"Please complete your registration process"
    
}

handleError(error: HttpErrorResponse){
  console.log(error);
  console.log("Error in Error Service");
  
  
  if(!error.error || !error.error.error){
    console.log("!error Log");
    
    const err = new HttpErrorResponse(error.error.message);
    return throwError(error);
  }
  if(error.status === 401 || error.error.status == 401){
    return throwError(this.Error.unauthorize);
  } 
  if(error.status === 400){
    return throwError(this.Error.not_registered);
  }
  if(error.status === 403 || error.error.status == 403){
    return throwError(this.Error.forbidden);
  }
  if(error.status === 422 || error.error.status == 422){
    return throwError(this.Error.email_err);
  }
  if(error.status === 406 || error.error.status == 406){
    console.log("REgistartion not complete errror");
    
    return throwError(this.Error.registration_incomplete);
  }

  else{
    console.log("Else Error Block");
    
    return throwError(error.error.message);
  }
}

 
}

