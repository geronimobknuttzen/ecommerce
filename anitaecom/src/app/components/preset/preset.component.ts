import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  presets:any[] = [];

  constructor(
    private prodSvc: ProductService,
    private cartSvc: CartService
    ) { }

  ngOnInit(): void {
    this.prodSvc.getAllProducts().subscribe((pres: any)=>{
      this.presets = pres
    })
  }

  AddToCart(id:number){
    this.cartSvc.AddProductToCart(id);
  }

}
