import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CartService } from 'src/app/Services/cart.service'
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  totalNumber: number = 0
  isLoggedIn: boolean = true
  constructor(
    private cartitem:CartService, 
    private router: Router,
    public auth:AuthenticationService) { }

  ngOnInit(): void {
    this.cartitem.getProdList().subscribe({
      next:data =>{
        this.totalNumber = data.length;
        //console.log(this.totalNumber)
      }
    })
  }
  email = localStorage.getItem('email')
  name = localStorage.getItem('name')
  signout(){
    this.router.navigate(['/']);
    localStorage.removeItem('product')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('authenitcated')
    localStorage.removeItem('user_id')
  }

  Logout(){
    this.auth.doLogout()
  }
}
