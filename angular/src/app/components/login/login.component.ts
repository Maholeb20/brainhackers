import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../Services/authentication.service'
import { Router} from '@angular/router';
//import { ToastrService } from "ngx-toastr"
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  
  Form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  currentUser = {};
  userToken: any = {}
  submitted = false; //bpplean
  errorMessage: String = " "// declaring a string data type assigning to the error message
 
  constructor(private formBuilder: FormBuilder, 
    public auth:AuthenticationService, 
    private router:Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }
  
  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

    let user = {
      email: this.Form.value.email,
      password: this.Form.value.password
    }
    this.auth.login(user).subscribe({
      next:data =>{
        this.loading = true;
        this.userToken = data
        localStorage.setItem('access_token', this.userToken.token)
        this.loading = false;
        this.router.navigate(['/products'])
      },
        error: err => {
          this.loading = false;
          this.errorMessage = err.error.message;
          
      }
    } 
  ) 
}  


  // //   this.auth.login(user).subscribe({
  // //    next:data => {
  // //      console.log(data);
  // //      this.router.navigate(['/products'])
  // //      this.info = data
  // //      this.id = this.info.arrData[0].id
  // //      this.email = this.info.arrData[0].email
  // //      this.name =  this.info.arrData[0].name;
  // //      this.authenitcated = true
  // //      this.isLoggedIn = true
  // //     //  localStorage.setItem('isLoggedIn', this.isLoggedIn)
  // //      localStorage.setItem('user_id', this.id);
  // //      localStorage.setItem('email', this.email);
  // //      localStorage.setItem('name', this.name);
  // //      localStorage.setItem('authenitcated', this.authenitcated);
  // //    },
  // //    error: err =>{
      
  // //     this.errormessage = err.message;
  // //     this.authenitcated = true
  // //     console.log(this.errormessage)
  // //   }
     
  // //  },)
  //   this.loginF();
   
  //   console.log(JSON.stringify(this.Form.value));
  }



