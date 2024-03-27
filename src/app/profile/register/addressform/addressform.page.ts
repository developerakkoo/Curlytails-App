import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toArray } from 'rxjs';
import { UserAddressService } from '../../../services/UserServices/shared/user-address.service'
@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.page.html',
  styleUrls: ['./addressform.page.scss'],
})
export class AddressformPage implements OnInit {

  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserAddress: UserAddressService
  ) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      number: [, [Validators.required, this.mobileNumberValidator]],
      flat: [, [Validators.required]],
      area: [, [Validators.required]],
      pincode: [, [Validators.required, this.pinCodeValidator]],
      city: ['Pune', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  pinCodeValidator(control: any) {
    if (!control.value) {
      return null; // No PIN code entered, validation passed
    }
    const valid = /^[0-9]{6}$/.test(control.value);
    return valid ? null : { invalidPinCode: true };
  }

  mobileNumberValidator(control: any) {
    if (!control.value) {
      return null; // No mobile number entered, validation passed
    }
    const valid = /^[0-9]{10}$/.test(control.value);
    return valid ? null : { invalidMobileNumber: true };
  }


  onSubmit() {
    if (this.addressForm.valid) {
      console.log(JSON.stringify(this.addressForm.value));
      let address = JSON.stringify(this.addressForm.value)
       this.UserAddress.setData(address)
       this.router.navigate(['/register'])
    }
  }


}
