import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartResponse } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-terminar',
  templateUrl: './terminar.component.html',
  styleUrls: ['./terminar.component.scss']
})
export class TerminarComponent implements OnInit {
  cartTotal: number;
  cartData: CartResponse;
  
  constructor(
    public cartSvc: CartService, 
    private orderSvc: OrdersService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartSvc.cartData$.subscribe((data:CartResponse)=>this.cartData = data);
    this.cartSvc.cartTotalPeso$.subscribe((cartTotalPesos)=>this.cartTotal = cartTotalPesos);
  }

}
