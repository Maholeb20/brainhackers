import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrdersService } from 'src/app/Services/orders.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  totalDue: number = 0;

  keyPressAlphanumeric(event: { keyCode: number; preventDefault: () => void; }) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private auth:AuthenticationService,
    private cartitem:CartService,
    private order:OrdersService,
   ) { }

  Form = new FormGroup({
    address: new FormControl(''),
    city: new FormControl(''),
    town: new FormControl(''),
    zip: new FormControl(''),
  });

  submitted = false;
  profile:any;
  id: any;
  delivery:number = 0;
  amountDelivery:number = 0;
  orderitem: any;
  actualPrice: number [] = []
  singleId: number [] = []
  ourOrder: any [] = []
  price: number = 0;
  prodId: number = 0;
  index:number = 0;
  ngOnInit(): void {
    this.loading = false;
    this.Form = this.formBuilder.group({
      address: ['', [Validators.required]],
      city: ['', Validators.required],
      town: ['', Validators.required],
      zip: ['', Validators.required],
      },
    );

    this.user();
    this.getid();
    this.getActualPrice()
    this.getAmount();
    this.deliveryCost();
    this.totalAmount();
  }

  get f():{ [key: string]: AbstractControl }{

    return this.Form.controls;
  }

  getAmount(){
    this.totalDue = this.cartitem.totalAmountDue();
  }
  
  deliveryCost(){
    if(this.totalDue > 4000){
      return this.delivery = this.totalDue * 0.10;
    }else{
      return this.delivery = 0;
    }
   
  }

  totalAmount(){
    return this.amountDelivery = this.totalDue + this.delivery;
  }
  
  getid(){
     this.singleId = this.cartitem.singleID
     for(let i=0; i<this.singleId.length; i++){
      this.prodId = this.singleId[i]
     }
  }
 
  getOrderlist(){
    this.ourOrder = this.cartitem.ourCard
  }

  getActualPrice(){
     this.actualPrice = this.cartitem.singlePrice;
     for(let i=0; i<this.actualPrice.length; i++){
      this.price = this.actualPrice[i]
      this.index = i
     }
  }
  
  user(){
    return this.auth.getUserProfile().subscribe({next:data => {
      this.profile = data;
      this.id = this.profile.decoded.id;
    }})  
  }

  onSubmit(){
    this.submitted = true;

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

     let shipping = {
        address : this.Form.value.address,
        city: this.Form.value.city,
        town : this.Form.value.town,
        zip : this.Form.value.zip,
        delivery_price: this.delivery,
        totalcost: this.amountDelivery
     }
    
    console.log( )
    console.log()

     let list = {
      product_id: this.singleId,
      actualprice: this.actualPrice,
      quantity: 1,
     }

     this.order.addOrders(shipping, this.id).subscribe({
      next:data =>{
        console.log(data);
        this.orderitem = data
        for(let i=0; i<this.singleId.length; i++){
          this.order.addIterms(this.singleId[i],this.actualPrice[i],list.quantity,this.orderitem).subscribe()
        }
        Swal.fire(
          'order successfully made!',
          '',
          'success'
        )
        this.router.navigate(['products'])
      }, error:err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
     })

     
  }

 
  cancelForm(){
    this.router.navigate(['cart'])
  }

  
}

// onSubmit():void{
  //   this.submitted = true;
  //   let shipping = {
  //     product_id : this.products_id,
  //     quantity: 1,
  //     address : this.Form.value.address,
  //     city: this.Form.value.city,
  //     town : this.Form.value.town,
  //     zip : this.Form.value.zip,
  //     delivery_price: this.shipping,
  //     totalcost: this.totalshipping
  //   }
   
  //   this.order.addOrders(shipping,this.id).subscribe({
  //     next:data => {
  //       console.log(data)
  //       Swal.fire(
  //         'Order Successful',
  //         'Order your order has been placed successully.'
  //         );

  //       this.router.navigate(['/products'])
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: '<a href="">Click here to re-order'
  //       })
  //     }

  //   })
  // }