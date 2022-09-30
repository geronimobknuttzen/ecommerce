import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { OrdersService } from './orders.service';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer } from './../models/cart';
import { Presets } from '../models/presets';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private XAMPP = environment.XAMPP;
  private SERVER_URL = environment.SERVER_URL;

  //VARIABLE PARA GUARDAR LA INFORMACIÓN DEL CARRITO EN EL LOCAL STORAGE DEL CLIENTE
  private cartDataClient: CartModelPublic = {
    totalDolar: 0,
    totalPesos: 0,
    prodData: [
      {
        id: 0,
        incart: 0,
      },
    ],
  };

  //VARIABLE PARA GUARDAR LA INFORMACION DEL CARRITO EN EL SERVIDOR
  private cartDataServer: CartModelServer = {
    totalDolar: 0,
    totalPesos: 0,
    // array of objects
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
  };

  //VARIABLE PARA GUARDAR LA INFORMACION DEL CARRITO EN EL SERVIDOR

  //OBSERVABLES PARA LOS COMPONENTES
  cartTotalUsd$ = new BehaviorSubject<number>(0);
  cartTotalPeso$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private http: HttpClient,
    private prodSvc: ProductService,
    private orderSvc: OrdersService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.cartTotalUsd$.next(this.cartDataServer.totalDolar);
    this.cartTotalPeso$.next(this.cartDataServer.totalPesos);
    this.cartData$.next(this.cartDataServer);

    //Obtengo la info desde el LocalStorage (if any)
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    // Revisar si la variable Info es null o tiene data adentro
    if (info !== null && info !== undefined && info.prodData[0].incart > 0) {
      //LocalStorage no esta vacio y tiene info
      this.cartDataClient = info;
    
      //Crear un loop para leer todas las entradas y colocarlas en el objeto cartDataServer
      this.cartDataClient.prodData.forEach((p) => {
      
      
        this.prodSvc.getAProduct(p.id).subscribe((actualProdInfo: Presets) => {
          if (this.cartDataServer.data[0].numInCart == 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.calculateTotalPeso();
            this.calculateTotalDolar();
            this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
            this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } 
          else {
            //CARTdataServer tiene información
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo,
            });
            this.calculateTotalPeso();
            this.calculateTotalDolar();
            this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
            this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({ ...this.cartDataServer });
        });
      });
    } 
  }

  AddProductToCart(id: number, quantity?: number) {
    
    quantity = 1; 
    this.prodSvc.getAProduct(id).subscribe((prod) => {
    //   // 1.si el carro esta vacio
      if (this.cartDataServer.data[0].product == undefined) {
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.cartDataServer.data[0].product = prod;
        this.calculateTotalPeso();
        this.calculateTotalDolar();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod[0].id;
        this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
        this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({ ...this.cartDataServer });
        this.toaster.success(
          `${prod[0].title} agregado a la canasta`,
          'Preset agregado',
          {
            timeOut: 2500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          }
        );
        // 2.si el carro tiene un item
      } else {
        let index = this.cartDataServer.data.findIndex((p) => p.product[0].id == prod[0].id); // -1 o un valor positivo
          // a.si el item esta ya en el carrito
        if (index !== -1) {
          this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod[0].quantity ? quantity : prod[0].quantity;
          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.toaster.info(
            `${prod[0].title} te espera en la canasta`,
            'Ya agregado',
            {
              timeOut: 2500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-full-width',
            }
          );
        } //END OF IF
        //    b.si el item no esta en el carrito
        else {
          this.cartDataServer.data.push({
            numInCart: 1,
            product: prod
          });
          this.cartDataClient.prodData.push({
            id: prod[0].id,
            incart: 1,
          });
          //TOASTER
          this.toaster.success(
            `${prod[0].title} agregado a la canasta`,
            'Preset agregado',
            {
              timeOut: 2500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );

          this.calculateTotalPeso();
          this.calculateTotalDolar();
          this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
          this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({ ...this.cartDataServer });
        } //END OF ELSE
      }
    });
  }


  // updateCartItems(index: number, increase: boolean) {
  //   let data = this.cartDataServer.data[index];

  //   if (increase) {
  //     if ((data.numInCart = 0 && data.numInCart < 2)) {
  //       data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
  //       this.cartDataClient.prodData[index].incart = data.numInCart;
  //       this.calculateTotalPeso();
  //       this.calculateTotalDolar();
  //       this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
  //       this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
  //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //       this.cartData$.next({ ...this.cartDataServer });
  //     }
  //   } else {
  //     data.numInCart--;
  //     if (data.numInCart < 1) {
  //       //BORRAR EL PRODUCTO
  //       this.cartData$.next({ ...this.cartDataServer });
  //     } else {
  //       this.cartData$.next({ ...this.cartDataServer });
  //       this.cartDataClient.prodData[index].incart = data.numInCart;
  //       this.calculateTotalPeso();
  //       this.calculateTotalDolar();
  //       this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
  //       this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
  //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //     }
  //   }
  // }

  deleteProdFromCart(index: number) {
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));
  
    if (window.confirm('Está seguro que quiere eliminar este item')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotalPeso();
      this.calculateTotalDolar();
      this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
      this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;

      if ( this.cartDataClient.totalDolar == 0) {
        this.cartDataClient = {
          totalDolar: 0,
          totalPesos: 0,
          prodData: [
            {
              incart: 0,
              id: 0,
            },
          ],
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      if ( this.cartDataServer.totalPesos == 0) {
        this.cartDataServer = {
          totalDolar: 0,
          totalPesos: 0,
          data: [{ numInCart: 0, product: undefined }],
        };
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
      }
    } else {
      //si se cancela la compra
      return;
    }
  }

  private calculateTotalPeso() {
    let TotalPesos = 0;
    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const{ precioPesos } = p.product[0];
      TotalPesos = TotalPesos + numInCart * precioPesos;
    });
    this.cartDataServer.totalPesos = TotalPesos;
    this.cartTotalPeso$.next(this.cartDataServer.totalPesos);
  }
  private calculateTotalDolar() {
    let TotalDolar = 0;
    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const { price } = p.product[0];
      TotalDolar = TotalDolar + numInCart * price;
    });
    this.cartDataServer.totalDolar = TotalDolar;
    this.cartTotalUsd$.next(this.cartDataServer.totalDolar);
  }

  checkoutFromCart(email: string, name: string) {
    this.resetServerData();
    this.http.post(`${this.SERVER_URL}/orders/new`, {
    // this.http.post(`${this.SERVER_URL}/orders.php?route=new`, {
        email: email,
        name: name,
        products: this.cartDataClient.prodData,
      })
      .subscribe((data: OrderResponse) => {
          this.orderSvc.getSingleOrder(data.order_id).subscribe((prods) => {
            if(data.success){
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  totalPeso: this.cartDataClient.totalPesos,
                  totalDolar: this.cartDataClient.totalDolar,
                },
              };
              this.spinner.hide().then();
              this.router
                .navigate(['/','gracias'], navigationExtras)
                .then((p) => {
                  this.cartDataClient = {
                    totalDolar: 0,
                    totalPesos: 0,
                    prodData: [
                      {incart: 0,id: 0},
                    ],
                  };
                  this.cartTotalUsd$.next(0);
                  this.cartTotalPeso$.next(0);
                  localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                })
                
            }
          });
      });
  }
  checkoutMP(items:any[]) {    
    this.http
      .post(`${this.SERVER_URL}/mp/create_preference`,{
        items: items
      })
      .subscribe((res:any)=>{
        if(res){
          let contenedor = document.getElementById('mercadoPago')
        
          window.location.href = res
        }
      })
  }
  
  private resetServerData() {
    this.cartDataServer = {
      totalDolar: 0,
      totalPesos: 0,
      data: [{ numInCart: 0, product: undefined }],
    };
    this.cartData$.next({ ...this.cartDataServer });
  }

  calculateSubTotalUsd(index): number {
    let subtotalU = 0;
    const p = this.cartDataServer.data[index];
    subtotalU = p.product.price * p.numInCart;
    return subtotalU;
  }
  calculateSubTotalPeso(index): number {
    let subtotalP = 0;
    const p = this.cartDataServer.data[index];
    subtotalP = p.product.precioPesos * p.numInCart;
    return subtotalP;
  }

  existsCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: CartModelServer[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): CartModelServer[] {
    
    return JSON.parse(localStorage.getItem('cart'));
  }
}

interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [
    {
      id: string;
      numInCart: string;
    }
  ];
}
