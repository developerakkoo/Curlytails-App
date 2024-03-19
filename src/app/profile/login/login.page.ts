import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { StorageServiceService } from '../../services/storage-service.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup
  message: any

  constructor(private fb: FormBuilder, private AuthService: AuthServiceService,
    private storageService: StorageServiceService,
    private rout: Router,
    private alertController: AlertController
  ) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
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

  async presentAlert(message :any) {
    const alert = await this.alertController.create({
      // header: 'A Short Title Is Best',
      // subHeader: message,
      message: message.message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.AuthService.loginUser(this.myForm.value).subscribe({
        next: (v) => {
          // console.log(this.presentAlert(v))
          this.message = v.message
           setTimeout(() => {
            localStorage.setItem('Token', v.data.accessToken)
          this.rout.navigate(['/'])
           }, 1000);
          // localStorage.setItem('Token', v.data.accessToken)
          // this.rout.navigate(['/'])
        } ,
        error: (e) => console.log(this.presentAlert(e.error)),
        complete: () => console.info('complete') 
      })

    }
  }

}
