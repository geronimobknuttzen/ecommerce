import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-original',
  templateUrl: './original.component.html',
  styleUrls: ['./original.component.scss']
})
export class OriginalComponent implements OnInit {
  constructor(
    private cartSvc: CartService
    ) { }

  ngOnInit(): void {
    document.getElementById('header').scrollIntoView();
  }

  AddToCart(id:number){
    this.cartSvc.AddProductToCart(id);
  }
  
}
