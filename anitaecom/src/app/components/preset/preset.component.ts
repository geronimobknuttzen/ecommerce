import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  presets:any[] = [];

  constructor(
    private prodSvc: ProductService,
    private cartSvc: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.prodSvc.getAllProducts().subscribe((pres: any)=>{
      this.presets = pres.presets
    })
  }

  AddToCart(id:number){
    this.cartSvc.AddProductToCart(id);
  }

  
  AddToLike(id:number){
    this.cartSvc.AddProductToLike(id);
  }

}
