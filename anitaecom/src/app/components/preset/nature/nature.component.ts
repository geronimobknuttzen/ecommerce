import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.scss']
})
export class NatureComponent implements OnInit {
  
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
