import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-terminar',
  templateUrl: './terminar.component.html',
  styleUrls: ['./terminar.component.scss']
})
export class TerminarComponent implements OnInit {
  cartTotal: number;
  cartData: CartModelServer;
  private isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  private isValidNombre = /^[a-z ,.'-]+$/i;
  paymentForm: FormGroup;
 
  constructor(
    public cartSvc: CartService, 
    private orderSvc: OrdersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.pattern(this.isValidEmail)
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.isValidNombre)
      ])
    })

    this.cartSvc.cartData$.subscribe((data:CartModelServer)=>this.cartData = data);
    this.cartSvc.cartTotalPeso$.subscribe((cartTotalPesos)=>this.cartTotal = cartTotalPesos);
  }
  onCheckout(){
    this.spinner.show().then(p=>{
      let email = this.paymentForm.value.email;
      let nombre = this.paymentForm.value.nombre;
      this.cartSvc.checkoutFromCart(email, nombre)
      console.log(this.paymentForm.value.email)
    })
  }

  getError(field: string):string{
    let msg;
    if(this.paymentForm.get(field).errors){
      msg = 'Debe completar este campo'
    } else if (this.paymentForm.get(field).hasError('pattern')){
      msg = 'No es válido'
    }
    return msg;
  }

  isValidField(field: string):boolean{
    return (this.paymentForm.get(field).touched || this.paymentForm.get(field).dirty && !this.paymentForm.get(field).valid)
  }

}
