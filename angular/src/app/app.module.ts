import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import{AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './Components/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FinalProductsPageComponent } from './Components/final-products-page/final-products-page.component';
import { OneProductComponent } from './Components/one-product/one-product.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FinalProductsPageComponent,
    LoginComponent,
    ShoppingCartComponent,
    NavBarComponent,
    OneProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
