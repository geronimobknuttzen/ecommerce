import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss']
})
export class ThankComponent implements OnInit {
  message: string;
  orderId: number;
  products: any[] = [];
  cartTotal: number
  constructor(
    private router: Router,
    private orderSvc: OrdersService) { 
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as {
        message: string,
        products: ProductsResponse[],
        orderId: number,
        total: number
      };
      this.message = state.message
      this.products = state.products
      this.orderId = state.orderId
      this.cartTotal = state.total
    }

  ngOnInit(): void {
  }

}

interface ProductsResponse{
  id: number,
  name: string,
  description: string,
  price: number,
  precioPeso: number,
  image: string
}