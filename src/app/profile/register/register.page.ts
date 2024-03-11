import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder , Validators} from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm:FormGroup;

  RegistrationDetial = {
    Name:'',
    email:'',
    number:'',
    address:'',
    password:''
  }

  constructor( private fb: FormBuilder ) { 
    this.myForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      mobile:['',[Validators.required, Validators.minLength(10)]],
      name:['',[Validators.required]],
      address:['',[Validators.required]]
    })
   }

  ngOnInit() { }

  onSubmit(){
        
    if(this.myForm.valid){
    console.log(this.myForm.value);
    
    }
  }

}
