import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { OrdersService } from './orders.service';
import { environment } from 'src/environments/environment';
import { Cart, CartResponse } from './../models/cart';
import { Presets } from '../models/presets';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Like, LikeResponse } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private SERVER_URL = environment.SERVER_URL;

  //VARIABLE PARA GUARDAR LA INFORMACIÓN DEL CARRITO EN EL LOCAL STORAGE DEL CLIENTE
  private cartDataClient: Cart = {
    totalDolar: 0,
    totalPesos: 0,
    prodData: [{
      id: 0,
      incart: 0
    }]
  };

  //VARIABLE PARA GUARDAR LA INFORMACIÓN DEL LIKE EN EL LOCAL STORAGE DEL CLIENTE
  private likeDataClient: Like = {
    prodData: [{
      id: 0,
      inlike: 0
    }]
  };

  //VARIABLE PARA GUARDAR LA INFORMACION DEL CARRITO EN EL SERVIDOR
  private cartDataServer: CartResponse = {
    totalDolar: 0,
    totalPesos: 0,
    data: [{
      product: undefined,
      numInCart: 0,
    }]
  };

  //VARIABLE PARA GUARDAR LA INFORMACION DEL CARRITO EN EL SERVIDOR
  private likeDataServer: LikeResponse = {
    data: [{
      product: undefined,
      numInLike: 0,
    }]
  };

  //OBSERVABLES PARA LOS COMPONENTES
  cartTotalUsd$ = new BehaviorSubject<number>(0);
  cartTotalPeso$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartResponse>(this.cartDataServer);
  likeData$ = new BehaviorSubject<LikeResponse>(this.likeDataServer);

  
  constructor(private http: HttpClient, 
    private prodSvc: ProductService,
    private orderSvc: OrdersService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) {

      this.cartTotalUsd$.next(this.cartDataServer.totalDolar);
      this.cartTotalPeso$.next(this.cartDataServer.totalPesos);
      this.cartData$.next(this.cartDataServer);
      this.likeData$.next(this.likeDataServer);
      
      //Obtengo la info desde el LocalStorage (if any)
      let info = JSON.parse(localStorage.getItem('cart'));

      // Revisar si la variable Info es null o tiene data adentro
      if(info !== null && info !== undefined && info.prodData[0].incart !== 0){
        //LocalStorage no esta vacio y tiene info
        this.cartDataClient = info;
        //Crear un loop para leer todas las entradas y colocarlas en el objeto cartDataServer
        this.cartDataClient.prodData.forEach(p=>{
          this.prodSvc.getAProduct(p.id).subscribe((actualProdInfo: Presets)=>{
            if(this.cartDataServer.data[0].numInCart == 0){
              this.cartDataServer.data[0].numInCart = p.incart;
              this.cartDataServer.data[0].product = actualProdInfo;
              this.calculateTotalPeso()
              this.calculateTotalDolar()
              this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
              this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
              localStorage.setItem('cart',JSON.stringify(this.cartDataClient))
            } else {
              //CARTdataServer tiene información
              this.cartDataServer.data.push({
                numInCart: p.incart,
                product: actualProdInfo
              });
              this.calculateTotalPeso()
              this.calculateTotalDolar()
              this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
              this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartData$.next({... this.cartDataServer})
          });
        });
      }
    }
    
    AddProductToCart(id:number, quantity?: number){
      this.prodSvc.getAProduct(id).subscribe(prod=>{
        // 1.si el carro esta vacio
        if(this.cartDataServer.data[0].product == undefined){
          this.cartDataServer.data[0].product = prod;
          this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
          this.calculateTotalPeso();
          this.calculateTotalDolar();
          this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
          this.cartDataClient.prodData[0].id = prod.id;
          this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
          this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({... this.cartDataServer});

          this.toaster.success(`${prod.name} agregado a la canasta`, 'Preset agregado',{
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass: 'toast-top-right'
          })
        } else {
          // 2.si el carro tiene un item
          let index = this.cartDataServer.data.findIndex(p=>p.product.id == prod.id); // -1 o un valor positivo
          if(index!==-1){
            //    a.si el item esta ya en el carrito
            if(quantity !== undefined && quantity <= prod.quantity){
              this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
            } else {
              this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart ++ : prod.quantity
            }
            this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
            this.toaster.info(`${prod.name} te espera en la canasta`, 'Ya agregado',{
              timeOut:1500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass: 'toast-top-full-width'
            })                      
          }//END OF IF
          //    b.si el item no esta en el carrito
          else {
            this.cartDataServer.data.push({
              product: prod,
              numInCart: 1
            });
            this.cartDataClient.prodData.push({
              id:prod.id,
              incart:1
            });
            //TOASTER
            this.toaster.success(`${prod.name} agregado a la canasta`, 'Preset agregado',{
              timeOut:1500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass: 'toast-top-right'
            })

            this.calculateTotalPeso();
            this.calculateTotalDolar();
            this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
            this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            this.cartData$.next({... this.cartDataServer})
          }//END OF ELSE
        }
      });
    }

    AddProductToLike(id:number, quantity?: number){
      this.prodSvc.getAProduct(id).subscribe(prod=>{
        // 1.si like esta vacio
        if(this.likeDataServer.data[0].product == undefined){
          this.likeDataServer.data[0].product = prod;
          this.likeDataServer.data[0].numInLike = quantity !== undefined ? quantity : 1;
          this.likeDataClient.prodData[0].inlike = this.likeDataServer.data[0].numInLike;
          this.likeDataClient.prodData[0].id = prod.id;
          localStorage.setItem('like', JSON.stringify(this.likeDataClient));
          this.likeData$.next({... this.likeDataServer});

          this.toaster.success(`${prod.name} Agregago a Favoritos`, 'Preset favorito',{
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass: 'toast-bottom-full-width'
          })
        } else {
          // 2.si el carro tiene un item
          let index = this.likeDataServer.data.findIndex(p=>p.product.id == prod.id); // -1 o un valor positivo
          if(index!==-1){
            //    a.si el item esta ya en el carrito
            if(quantity !== undefined && quantity <= prod.quantity){
              this.likeDataServer.data[index].numInLike = this.likeDataServer.data[index].numInLike < prod.quantity ? quantity : prod.quantity;
            } else {
              this.likeDataServer.data[index].numInLike < prod.quantity ? this.likeDataServer.data[index].numInLike ++ : prod.quantity
            }
            this.likeDataClient.prodData[index].inlike = this.likeDataServer.data[index].numInLike;
            this.toaster.info(`${prod.name} está en favoritos`, 'Ya agregado',{
              timeOut:1500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass: 'toast-bottom-full-width'
            })                      
          }//END OF IF
          //    b.si el item no esta en el carrito
          else {
            this.likeDataServer.data.push({
              product: prod,
              numInLike: 1
            });
            this.likeDataClient.prodData.push({
              id:prod.id,
              inlike:1
            });
            //TOASTER
            this.toaster.success(`${prod.name} Agregago a Favoritos`, 'Preset favorito',{
              timeOut:1500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass: 'toast-bottom-full-width'
            })

            localStorage.setItem('like', JSON.stringify(this.likeDataClient));
            this.likeData$.next({... this.likeDataServer})
          }//END OF ELSE
        }
      });
    }
  updateCartItems(index:number, increase:boolean){
    let data = this.cartDataServer.data[index];

    if (increase){
      if(data.numInCart = 0 && data.numInCart < 2){
        data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.calculateTotalPeso();
        this.calculateTotalDolar();
        this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
        this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({... this.cartDataServer})
      }
    } else {
      data.numInCart --;
      if (data.numInCart < 1){
        //BORRAR EL PRODUCTO
        this.cartData$.next({... this.cartDataServer});
      } else {
        this.cartData$.next({... this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.calculateTotalPeso();
        this.calculateTotalDolar();
        this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
        this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProdFromCart(index:number){
    if(window.confirm('Está seguro que quiere eliminar este item')){
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotalPeso();
      this.calculateTotalDolar();
      this.cartDataClient.totalDolar = this.cartDataServer.totalDolar;
      this.cartDataClient.totalPesos = this.cartDataServer.totalPesos;

      if(this.cartDataClient.totalDolar == 0 && this.cartDataClient.totalPesos == 0){
        this.cartDataClient = {totalDolar: 0, totalPesos:0, prodData:[{ incart: 0, id: 0}]};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      if(this.cartDataServer.totalDolar == 0 && this.cartDataServer.totalPesos == 0){
        this.cartDataServer = {totalDolar: 0, totalPesos:0, data:[{ numInCart: 0, product: undefined}]};
        this.cartData$.next({... this.cartDataServer});
      } else {
        this.cartData$.next({... this.cartDataServer});
      }
    } else {
      //si se cancela la compra
      return;
    }
  }

  deleteProdFromLike(index:number){
    if(window.confirm('Está seguro que quiere eliminar este item')){
      this.likeDataServer.data.splice(index, 1);
      this.likeDataClient.prodData.splice(index, 1);

      if(this.likeDataClient.prodData?.[0]){
        this.likeDataClient = {prodData:[{ inlike: 0, id: 0}]};
        localStorage.setItem('like', JSON.stringify(this.likeDataClient));
      } else {
        this.likeDataClient = {prodData:[{ inlike: 0, id: 0}]};
        localStorage.setItem('like', JSON.stringify(this.likeDataClient));
      }
      if(this.likeDataServer.data[0]){
        this.likeDataServer = {data:[{ numInLike: 0, product: undefined}]};
        this.likeData$.next({... this.likeDataServer});
      } else {
        this.likeDataServer = {data:[{ numInLike: 0, product: undefined}]};
        this.likeData$.next({... this.likeDataServer});
      }
    }
  }

  private calculateTotalPeso(){
    let TotalPesos = 0;
    this.cartDataServer.data.forEach(p=>{
      const {numInCart} = p;
      const { precioPesos } = p.product
      TotalPesos = TotalPesos + (numInCart * precioPesos);
    })
    this.cartDataServer.totalPesos = TotalPesos;
    this.cartTotalPeso$.next(this.cartDataServer.totalPesos);
  }
  private calculateTotalDolar(){
    let TotalDolar = 0;
    this.cartDataServer.data.forEach(p=>{
      const {numInCart} = p;
      const { price } = p.product
      TotalDolar = TotalDolar + (numInCart * price);
    });
    this.cartDataServer.totalDolar = TotalDolar;
    this.cartTotalUsd$.next(this.cartDataServer.totalDolar);
  }

  checkoutFromCart(email:string, name:string){
    this.http.post(`${this.SERVER_URL}/orders/payment`, null).subscribe((res:{success:boolean})=>{
      if(res.success){
        this.resetServerData();
        this.http.post(`${this.SERVER_URL}/orders/new`, {
          email: email,
          name: name,
          products: this.cartDataClient.prodData
        }). subscribe((data: OrderResponse)=>{

          this.orderSvc.getSingleOrder(data.order_id).then(prods=>{
            if(data.success){
              const navigationExtras: NavigationExtras = {
                state:{
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  totalPeso: this.cartDataClient.totalPesos,
                  totalDolar: this.cartDataClient.totalDolar
                }
              };
              this.spinner.show().then();
              this.router.navigate(['/gracias'], navigationExtras).then(p=>{
                this.cartDataClient = {totalDolar: 0, totalPesos: 0, prodData:[{ incart: 0, id: 0}]};
                this.cartTotalUsd$.next(0);
                this.cartTotalPeso$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              }).catch(error=>console.log(error));
            }
          });
        });
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toaster.error(`Perdón, he fallado en agendar su pedido`, 'Estado del Pedido',{
          timeOut:1500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass: 'toast-top-right'
        })
      }
    })
  }

  private resetServerData(){
    this.cartDataServer = {totalDolar: 0, totalPesos: 0, data:[{numInCart: 0, product: undefined}]};
    this.cartData$.next({... this.cartDataServer})
  }

  calculateSubTotalUsd(index):number{
    let subtotalU = 0;
    const p = this.cartDataServer.data[index];
    subtotalU = p.product.price * p.numInCart;
    return subtotalU;
  }
  calculateSubTotalPeso(index):number{
    let subtotalP = 0;
    const p = this.cartDataServer.data[index];
    subtotalP = p.product.precioPesos * p.numInCart;
    return subtotalP;
  }
}

interface OrderResponse{
  order_id:number,
  success: boolean,
  message: string,
  products: [{
    id:string,
    numInCart: string
  }]
}