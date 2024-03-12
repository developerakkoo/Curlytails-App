import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { AuthServiceService } from '../../services/auth-service.service'
import { StorageServiceService } from '../../services/storage-service.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup


  constructor(private fb: FormBuilder, private AuthService: AuthServiceService,
    private storageService: StorageServiceService,
    private rout: Router
  ) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.AuthService.loginUser(this.myForm.value).subscribe(res => {
        console.log(res);
        if (res.message == 201 || 200) {
          console.log("Login Successfull!");
          localStorage.setItem('Token', res.data.accessToken)
          this.rout.navigate(['/'])
        } else {
          console.log(res.message);
        }
      })

    }
  }

}
