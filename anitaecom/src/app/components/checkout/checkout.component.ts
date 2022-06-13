import { CartModelServer } from './../../models/cart';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormGroup, FormControl } from '@angular/forms'
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public payPalConfig: IPayPalConfig;
  public showPaypalButtons: boolean;
  cartTotal: number;
  cartData: CartModelServer;
  email: string;
  name: string;

  constructor(
    public cartSvc: CartService, 
    private orderSvc: OrdersService,
    private router: Router,
    private spinner: NgxSpinnerService
    
    ) { }

  ngOnInit(): void {
    this.cartSvc.cartData$.subscribe((data:CartModelServer)=>this.cartData = data);
    this.cartSvc.cartTotalUsd$.subscribe((cartTotalUsd)=>this.cartTotal = cartTotalUsd);
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AWBsfnd8f6pg_l2gUK8jq4DFEDSUGBiAyyJeFbPeHUsBefp3Php_y8tKAOp22i4nx96odtQOUMC0yAtw",
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: '9.99'
                    }
                }
            },
            items: [{
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                },
            }]
        }]
      },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
  }
  onCheckout(){
    this.spinner.show().then(p=>{
      this.cartSvc.checkoutFromCart(this.email, this.name)
    })
  }

  pay() {
    this.showPaypalButtons = true;
  }
 
  back(){
    this.showPaypalButtons = false;
  }

}
