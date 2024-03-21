import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder , Validators} from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm:FormGroup;

  RegistrationDetial = {
    name:'',
    email:'',
    phoneNo:'',
    address:'',
    password:''
  }

  isAlertOpen = false;
  alertButtons = ['Close'];
  showPassword: boolean = false;


  constructor( private fb: FormBuilder, private AuthService : AuthServiceService, private router: Router, private alertController: AlertController ) { 
    this.myForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      phoneNo:['',[ Validators.required,
        Validators.minLength(10), Validators.maxLength(10)]],
      name:['',[Validators.required]],
      address:['',[Validators.required]]
    })
   }

  ngOnInit() { }


  togglePasswordVisibility() {
    console.log("method hitt");
    
    this.showPassword = !this.showPassword;
  }

  setOpen(isOpen: boolean) {
    if(isOpen == true){
      this.isAlertOpen = isOpen;
    }else{
      this.isAlertOpen = isOpen;
      this.router.navigate(['/login']);
    }
    
  }

  async presentAlert(message :any) {
    const alert = await this.alertController.create({
      // header: 'A Short Title Is Best',
      // subHeader: message,
      message: message.message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  onSubmit(){
        
    if(this.myForm.valid){
    console.log(this.myForm.value);
    this.AuthService.registerUser(this.myForm.value).subscribe({
      next: (v) =>  {
        this.presentAlert(v)
        setTimeout(() => {
          // localStorage.setItem('Token', v.data.accessToken)
        this.router.navigate(['/login'])
         }, 1000);
      },
      error: (e) => console.log(this.presentAlert(e.error)),
      complete: () => console.info('complete') 
    })
    
    }
  }

  alreadyRegistered(){
    this.router.navigate(['/login'])
  }

}
