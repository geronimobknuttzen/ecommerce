import { CartResponse } from './../../models/cart';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Preset } from 'src/app/models/presets';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartResponse;
  cartTotalUsd: number;
  cartTotalPesos: number;
  cartSubtotalUsd: number;
  cartSubtotalPesos: number;
  presets:string;
  id: number;

  medioDePago:string;

  constructor(public cartSvc: CartService, private prodSvc: ProductService) { }

  ngOnInit(): void {
    this.cartSvc.cartData$.subscribe((data:CartResponse)=>this.cartData = data);
    this.cartSvc.cartTotalUsd$.subscribe((cartTotalUsd)=>this.cartTotalUsd = cartTotalUsd);
    this.cartSvc.cartTotalPeso$.subscribe((cartTotalPesos)=>this.cartTotalPesos = cartTotalPesos);
  }
  tipoPagoPeso(){
    this.medioDePago = 'mercadoPago'
  }
  tipoPagoDolar(){
    this.medioDePago = 'payPal'
  }

}
