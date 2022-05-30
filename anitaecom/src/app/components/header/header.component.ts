import { Component, OnInit } from '@angular/core';
import { CartResponse } from 'src/app/models/cart';
import { LikeResponse } from 'src/app/models/like';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartResponse;
  likeData: LikeResponse;
  cartTotalPeso: number;
  cartTotalUsd: number;

  constructor( public cartSvc: CartService) { }

  ngOnInit(): void {
    this.cartSvc.cartTotalPeso$.subscribe( total => this.cartTotalPeso = total);
    this.cartSvc.cartTotalUsd$.subscribe( total => this.cartTotalUsd = total);
    this.cartSvc.cartData$.subscribe(data=> this.cartData = data);
    this.cartSvc.likeData$.subscribe(like=> this.likeData = like);
  }

}
