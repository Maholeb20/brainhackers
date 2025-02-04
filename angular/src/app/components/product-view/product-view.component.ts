import { Component, OnInit, ViewChild } from '@angular/core';
import { CardService } from 'src/app/Services/card.service';
import { CartService } from 'src/app/Services/cart.service'
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  

  product!:any;
  items: any;
  constructor(private cartitem:CartService) {
    this.loading = true;
    let product:any;
    product = localStorage.getItem("product");

    //console.log(product)
    this.product = JSON.parse(product)
    this.loading = false;
  }
   
  ngOnInit(): void {
    this.loading = false;
    //this.readproduc();

    //this.addtoCart(this.items);
    // this.getCardbyId();
  }
  addToCart(item: any): void {
    this.loading = true;
    this.cartitem.addToCart(item)
    this.loading = false;
    
  }
  

  // readproduc(){
  //   let product:any;
  //   product = localStorage.getItem("product");

  //   // this.product.forEach((a:any)=>{
  //   //   Object.assign(a,{quatity:1, total:a.prod_price}) 
  //   //   });

  //   console.log(product)
  //   this.product = JSON.parse(product)
  // }

  // addtoCart(item:any){
  //   this.cartservice.addToCart(item)
  // }

  // getCardbyId(){
  //   return this.cardservice.getCardbyId(this.product).subscribe({
  //     next:data =>{
  //       this.product_id = data;
     
  //       console.log(data)
  //     }
  //   })
  // }


  
}

