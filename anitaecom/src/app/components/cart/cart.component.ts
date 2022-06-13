import { environment } from './../../../environments/environment';
import { CartModelServer } from './../../models/cart';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showPaypalButtons: boolean;

  cartData: CartModelServer;
  cartTotalUsd: number;
  cartTotalPesos: number;
  cartSubtotalUsd: number;
  cartSubtotalPesos: number;
  presets: string;
  id: number;
  email: string;
  name: string;

  medioDePago: string;

  constructor(
    public cartSvc: CartService,
    private spinner: NgxSpinnerService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.cartSvc.cartData$.subscribe(
      (data: CartModelServer) => (this.cartData = data)
    );
    this.cartSvc.cartTotalUsd$.subscribe(
      (cartTotalUsd) => (this.cartTotalUsd = cartTotalUsd)
    );
    this.cartSvc.cartTotalPeso$.subscribe(
      (cartTotalPesos) => (this.cartTotalPesos = cartTotalPesos)
    );
    
    this.zone.runOutsideAngular(()=>{
      this.payPalConfig = {
        currency: 'USD',
        clientId: `${environment.CLIENT_PAYPAL}`,
        createOrderOnClient: (data) =>
          <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.cartTotalUsd.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: this.cartTotalUsd.toString(),
                    },
                  },
                },
                items:this.getItemList(),
              },
            ],
          },
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
        },
        onApprove: (data, actions) => {
          actions.order.get().then((details) => {
            this.zone.run(()=>{
              this.spinner.show()
              .then(p=>{
                let fullName = details.payer.name.given_name + ' ' + details.payer.name.surname
                this.cartSvc.checkoutFromCart(details.payer.email_address, fullName)
              })
            })
          });
        }
      };
    })

  }
  getItemList(): any[]{
    const items:any[] = [];
    let item = {};
    return items
  }
  tipoPagoPeso() {
    this.medioDePago = 'mercadoPago';
  }
  tipoPagoDolar() {
    this.medioDePago = 'payPal';
  }

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }
}