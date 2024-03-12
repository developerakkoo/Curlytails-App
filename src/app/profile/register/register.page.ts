import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder , Validators} from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router'

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


  constructor( private fb: FormBuilder, private AuthService : AuthServiceService, private router: Router ) { 
    this.myForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      phoneNo:['',[Validators.required, Validators.minLength(10)]],
      name:['',[Validators.required]],
      address:['',[Validators.required]]
    })
   }

  ngOnInit() { }

  setOpen(isOpen: boolean) {
    if(isOpen == true){
      this.isAlertOpen = isOpen;
    }else{
      this.isAlertOpen = isOpen;
      this.router.navigate(['/login']);
    }
    
  }

  onSubmit(){
        
    if(this.myForm.valid){
    console.log(this.myForm.value);
    this.AuthService.registerUser(this.myForm.value).subscribe(res => {
      console.log(res);
      if(res.message == 201 || 200){
        this.setOpen(true)
      }
    })
    
    }
  }

  alreadyRegistered(){
    this.router.navigate(['/login'])
  }

}
