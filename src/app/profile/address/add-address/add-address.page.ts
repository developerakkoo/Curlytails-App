import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  addressForm!:FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              ) {
                this.addressForm = this.fb.group({
                  name:['',[Validators.required]],
                  number:[,[Validators.required, this.mobileNumberValidator]],
                  flat:[,[Validators.required]],
                  area:[,[Validators.required]],
                  pincode:[,[Validators.required, this.pinCodeValidator]],
                  city:['Pune',[Validators.required]]
                })
               }

  ngOnInit() {
  }

  pinCodeValidator(control:any) {
    if (!control.value) {
      return null; // No PIN code entered, validation passed
    }
    const valid = /^[0-9]{6}$/.test(control.value);
    return valid ? null : { invalidPinCode: true };
  }
  
  mobileNumberValidator(control:any) {
    if (!control.value) {
      return null; // No mobile number entered, validation passed
    }
    const valid = /^[0-9]{10}$/.test(control.value);
    return valid ? null : { invalidMobileNumber: true };
  }
  

  onSubmit(){
    if(this.addressForm.valid){
      console.log(this.addressForm.value);
      
    }
  }

}
