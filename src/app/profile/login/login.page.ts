import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { StorageServiceService } from '../../services/storage-service.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup
  message: any
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private AuthService: AuthServiceService,
    private storageService: StorageServiceService,
    private rout: Router,
    private alertController: AlertController,
    private toastController: ToastController
 
  ) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {

  }

  // below code is same in register page. Which can be optimized

  // toast to represent error message
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 1500,
      position: position,
    });

    await toast.present();
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // onSubmit() {
  //   if (this.myForm.valid) {
  //     console.log(this.myForm.value);
  //     this.AuthService.loginUser(this.myForm.value).subscribe(res => {
  //       console.log(res);
  //       if (res.message == 201 || 200) {
  //         console.log("Login Successfull!");
  //         localStorage.setItem('Token', res.data.accessToken)
  //         this.rout.navigate(['/'])
  //       } else {
  //         console.log(res.message);
  //       }
  //     })

  //   }
  // }


  onSubmit() {
    console.log("submit method hitt!!");
    
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.AuthService.loginUser(this.myForm.value).subscribe({
        next: (v) => {
          // console.log(this.presentAlert(v))
          this.message = v.message
          this.presentToast('top')
          //  setTimeout(() => {
          //   localStorage.setItem('Token', v.data.accessToken)
          // this.rout.navigate(['/'])
          //  }, 1000);
          localStorage.setItem('Token', v.data.accessToken)
          this.rout.navigate(['/'])
          console.log(v.data.accessToken);
          
        } ,
        error: (e) => {
          // console.log(e.error.message),
          this.message = e.error.message
          this.presentToast('bottom')
        },
        complete: () => console.info('complete') 
      })

    }else{
      const passwordControl = this.myForm.get('password');
      const emailControl = this.myForm.get('email');

      if(passwordControl?.['invalid'] && emailControl?.['invalid']){
        this.message = 'Invalid Credentials.';
        this.presentToast('bottom')
      }else if (passwordControl?.['invalid']) {
        this.validatePassword()
      } else {
         this.validateEmail()
      }
    }
  }

}
