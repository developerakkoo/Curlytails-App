import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserCartServiceService } from '../../services/UserServices/user-cart-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm: FormGroup;

  RegistrationDetial = {
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    password: ''
  }

  isAlertOpen = false;
  alertButtons = ['Close'];
  showPassword: boolean = false;
  message: any


  constructor(private fb: FormBuilder,
    private AuthService: AuthServiceService, private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    ) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
  }

  ngOnInit() { }

  // toast to represent error message
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 1800,
      position: position,
    });

    await toast.present();
  }

  validatename() {
    const nameControl = this.myForm.get('name');

    if (nameControl?.invalid && nameControl?.touched) {
      if (nameControl.errors?.['required']) {
        this.message = 'Name is required.';
        this.presentToast('top');
      }
      // Add additional validation rules if needed
    }
  }

  validatenumber() {
    const phoneControl = this.myForm.get('phoneNo');

    if (phoneControl?.invalid && phoneControl?.touched) {
      if (phoneControl.errors?.['required']) {
        this.message = 'Phone number is required.';
        this.presentToast('top');
      } else if (phoneControl.errors?.['pattern']) {
        this.message = 'Please enter a valid phone number.';
        this.presentToast('top');
      }
    }
  }

  validateEmail() {
    const emailControl = this.myForm.get('email');

    if (emailControl?.invalid && emailControl?.touched) {
      if (emailControl.errors?.['required']) {
        this.message = 'Email is required.';
        this.presentToast('top')
      } else if (emailControl.errors?.['email']) {
        this.message = 'Please enter a valid email address.';
        this.presentToast('top')
      }
    }
  }

  validatePassword() {
    const passwordControl = this.myForm.get('password');

    if (passwordControl?.['invalid'] && passwordControl.touched) {
      if (passwordControl.errors?.['required']) {
        this.message = 'Password is required.';
        this.presentToast('bottom')
      } else if (passwordControl.errors?.['minlength']) {
        this.message = 'Password must be at least 8 characters long.';
        this.presentToast('bottom')
      }
    }
  }

  passwordMatchValidator() {
    const passwordControl = this.myForm.get('password');
    const confirmPasswordControl = this.myForm.get('cpassword');

    if (passwordControl && confirmPasswordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = confirmPasswordControl.value;
  
      if (passwordValue !== confirmPasswordValue) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        this.message = 'Passwords do not match.';
        this.presentToast('bottom')
      } else {
        confirmPasswordControl.setErrors(null);
        this.message = 'Passwords match.';
        this.presentToast('bottom')
      }
    }

    // if (
    //   confirmPasswordControl!.errors &&
    //   !confirmPasswordControl!.errors['passwordMismatch']
    // ) {
    //   // Other error present, don't overwrite it
    //   return;
    // }

    // if (passwordControl!.value !== confirmPasswordControl!.value) {
    //   confirmPasswordControl!.setErrors({ passwordMismatch: true });
    //   this.message = "Password Mismatched"
    //   this.presentToast('top')
    // } else {
    //   confirmPasswordControl!.setErrors(null);
    // }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // setOpen(isOpen: boolean) {
  //   if(isOpen == true){
  //     this.isAlertOpen = isOpen;
  //   }else{
  //     this.isAlertOpen = isOpen;
  //     this.router.navigate(['/login']);
  //   }

  // }

  // async presentAlert(message :any) {
  //   const alert = await this.alertController.create({
  //     // header: 'A Short Title Is Best',
  //     // subHeader: message,
  //     message: message.message,
  //     buttons: ['Ok'],
  //   });

  //   await alert.present();
  // }

  onSubmit() {
   console.log("method hit!!");
   
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.AuthService.registerUser(this.myForm.value).subscribe({
        next: (v) =>  {
          this.message = "Registration Successfull!"
          this.presentToast('bottom')
          // setTimeout(() => {
          //   // localStorage.setItem('Token', v.data.accessToken)
          // this.router.navigate(['/login'])
          //  }, 1000);
        },
        error: (e) => {
          this.message = e.error.message
          this.presentToast('bottom')
        } 
      })

    }else{
      console.log("form validation failed");
      
    }
  }

  alreadyRegistered() {
    this.router.navigate(['/login'])
  }

}
