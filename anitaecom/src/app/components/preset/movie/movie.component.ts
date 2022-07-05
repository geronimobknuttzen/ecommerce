import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
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