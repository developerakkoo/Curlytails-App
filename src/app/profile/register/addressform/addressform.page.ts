import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toArray } from 'rxjs';
import { UserAddressService } from '../../../services/UserServices/shared/user-address.service'
import { UserFormDetailsService } from '../../../services/UserServices/shared/user-form-details.service'
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.page.html',
  styleUrls: ['./addressform.page.scss'],
})
export class AddressformPage implements OnInit, AfterViewInit {

  UserRegistrationDetails = {
    name:'',
    address:'',
    phoneNo:'',
    email:'',
    password:'',
  }

  addressForm!: FormGroup;
  message: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userAddress: UserAddressService,
    private RegistrationDetails: UserFormDetailsService,
    private AuthService: AuthServiceService,
    private toastController: ToastController,
  ) {


    this.addressForm = this.fb.group({
      flat: [''],
      road: [''],
      county: [''],
      postcode: [, [Validators.required, this.pinCodeValidator]],
      state_district: ['', [Validators.required]],
      state: [''],
      country: ['']
    })


  }

  ngOnInit() {

    this.RegistrationDetails.Userdetails$.subscribe(res => {
      console.log(res);
      this.UserRegistrationDetails.name = res.name
      this.UserRegistrationDetails.email = res.email
      this.UserRegistrationDetails.phoneNo = res.phoneNo
      this.UserRegistrationDetails.password = res.password      
    })
    
  }

  ngAfterViewInit(): void {
    // below method takes the address and shows it in input address box of myForm
    this.userAddress.Address$.subscribe(add => {
      // console.log("address here --->" + JSON.stringify(add));
      if (Object.keys(add).length !== 0) {
        const flatValue = add.flat ? add.flat : '';
        const county = add.county ? add.county : '';
        const stateDistrict = add.state_district ? add.state_district : '';
        const state = add.state ? add.state : '';
        let roadOrVillage = '';

        if (add.road !== undefined ) {
          roadOrVillage = add.road;
        } else if (add.village !== undefined ) {
          roadOrVillage = add.village;
        }
        if(roadOrVillage){
          this.addressForm.setValue({
            flat: flatValue,
            road: roadOrVillage,
            county: county,
            state_district: stateDistrict,
            state: state,
            postcode: add.postcode,
            country: add.country
          });
          // console.log(this.addressForm.value);
        }
      }
    });
   

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

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 1800,
      position: position,
    });

    await toast.present();
  }

  onSubmit() {
    if(this.addressForm.valid){
      let formattedAddress = '';
      if (this.addressForm.value.flat !== undefined && this.addressForm.value.flat !== '') {
       formattedAddress += `${this.addressForm.value.flat}, `;
     }
     
     if (this.addressForm.value.road !== undefined) {
       formattedAddress += `${this.addressForm.value.road}, `;
     }
     
     if (this.addressForm.value.road !== undefined) {
      formattedAddress += `${this.addressForm.value.road}, `;
    }

     if (this.addressForm.value.county !== undefined) {
       formattedAddress += `${this.addressForm.value.county}, `;
     }
     
     if (this.addressForm.value.state_district !== undefined) {
       formattedAddress += `${this.addressForm.value.state_district}, `;
     }

     if (this.addressForm.value.state !== undefined) {
       formattedAddress += `${this.addressForm.value.state}, `;
     }
     if (this.addressForm.value.postcode !== undefined) {
       formattedAddress += `${this.addressForm.value.postcode}, `;
     }

     formattedAddress = formattedAddress.replace(/,\s*$/, '');
     this.UserRegistrationDetails.address = formattedAddress
     console.log("UserRegistrationDetails---->"+this.UserRegistrationDetails);

           this.AuthService.registerUser(this.UserRegistrationDetails).subscribe({
        next: (v) => {
          this.message = "Registration Successfull!"
          this.presentToast('bottom')
          // setTimeout(() => {
          //   // localStorage.setItem('Token', v.data.accessToken)
          // this.router.navigate(['/login'])
          //  }, 1000);
        },
        error: (e) => {
          this.message = e.error.message
          this.presentToast('top')
          this.router.navigate(['/register'])
        }
      })
     
   }
  }

  


}
