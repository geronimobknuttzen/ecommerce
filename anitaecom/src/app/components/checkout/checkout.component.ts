import { CartResponse } from './../../models/cart';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartTotal: number;
  cartData: CartResponse;

  constructor(
    public cartSvc: CartService, 
    private orderSvc: OrdersService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.cartSvc.cartData$.subscribe((data:CartResponse)=>this.cartData = data);
    this.cartSvc.cartTotalUsd$.subscribe((cartTotalUsd)=>this.cartTotal = cartTotalUsd);
  }
  onCheckout(){
    this.spinner.show().then(p=>{
      this.cartSvc.checkoutFromCart(4)
    })
  }
}
