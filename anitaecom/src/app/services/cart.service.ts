import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { OrdersService } from './orders.service';
import { environment } from 'src/environments/environment';
import { Cart, CartResponse } from './../models/cart';
import { Preset } from '../models/presets';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private SERVER_URL = environment.SERVER_URL;

  //VARIABLE PARA GUARDAR LA INFORMACIÓN DEL CARRITO EN EL LOCAL STORAGE DEL CLIENTE
  private cartDataClient: Cart = {
    total: 0,
    prodData: [{
      id: 0,
      incart: 0
    }]
  };

  //VARIABLE PARA GUARDAR LA INFORMACION DEL CARRITO EN EL SERVIDOR
  private cartDataServer: CartResponse = {
    total: 0,
    data: [{
      product: undefined,
      numInCart: 0,
    }]
  };

  //OBSERVABLES PARA LOS COMPONENTES
  cartTotal$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartResponse>(this.cartDataServer);

  
  constructor(private http: HttpClient, 
    private prodSvc: ProductService,
    private orderSvc: OrdersService,
    private router: Router) {

      this.cartTotal$.next(this.cartDataServer.total);
      this.cartDataObs$.next(this.cartDataServer)
      
      //Obtengo la info desde el LocalStorage (if any)
      let info = JSON.parse(localStorage.getItem('cart'));

      // Revisar si la variable Info es null o tiene data adentro
      if(info !== null && info !== undefined && info.prodData[0].incart !== 0){
        //LocalStorage no esta vacio y tiene info
        console.log(info);
        this.cartDataClient = info;
        //Crear un loop para leer todas las entradas y colocarlas en el objeto cartDataServer
        this.cartDataClient.prodData.forEach(p=>{
          this.prodSvc.getAProduct(p.id).subscribe((actualProdInfo: Preset)=>{
            if(this.cartDataServer.data[0].numInCart == 0){
              this.cartDataServer.data[0].numInCart = p.incart;
              this.cartDataServer.data[0].product = actualProdInfo;
              //TODO CREAR calculateTotal function
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart',JSON.stringify(this.cartDataClient))
            } else {
              //CARTdataServer tiene información
              this.cartDataServer.data.push({
                numInCart: p.incart,
                product: actualProdInfo
              });
              //TODO CREAR calculateTotal function
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({... this.cartDataServer})
          });
        });
      }
    }
    
    AddProductToCart(id:number, quantity: number){
      this.prodSvc.getAProduct(id).subscribe(prod=>{
        // 1.si el carro esta vacio
        if(this.cartDataServer.data[0].product == undefined){
          this.cartDataServer.data[0].product = prod;
          this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
          // Calcular cantidad total
          this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
          this.cartDataClient.prodData[0].id = prod.id;
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObs$.next({... this.cartDataServer});
          // TODO mostrar toast notification
        } else {
          // 2.si el carro tiene un item
          let index = this.cartDataServer.data.findIndex(p=>p.product.id == prod.id); // -1 o un valor positivo
          if(index!==-1){
            //    a.si el item esta ya en el carrito
            if(quantity !== undefined && quantity <= prod.quantity){
              this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity
            } else {
              this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart ++ : prod.quantity
            }
            this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
                      // TODO mostrar toast notification
          }//END OF IF
          //    b.si el item no esta en el carrito
          else {
            this.cartDataServer.data.push({
              numInCart: 1,
              product: prod
            });
            this.cartDataClient.prodData.push({
              incart:1,
              id:prod.id
            });
            // TODO mostrar toast notification

            // Calcular total
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            this.cartDataObs$.next({... this.cartDataServer})
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
        //TODO calcular total
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({... this.cartDataServer})
      }
    } else {
      data.numInCart --;
      if (data.numInCart < 1){
        //BORRAR EL PRODUCTO
        this.cartDataObs$.next({... this.cartDataServer});
      } else {
        this.cartDataObs$.next({... this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        //TODO calcular total
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProdFromCart(index:number){
    if(window.confirm('Está seguro que quiere eliminar este item')){
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      // TODO Calcular total
      this.cartDataClient.total = this.cartDataServer.total;

      if(this.cartDataClient.total == 0){
        this.cartDataClient = {total: 0, prodData:[{ incart: 0, id: 0}]};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      if(this.cartDataServer.total == 0){
        this.cartDataServer = {total: 0, data:[{ numInCart: 0, product: undefined}]};
        this.cartDataObs$.next({... this.cartDataServer});
      } else {
        this.cartDataObs$.next({... this.cartDataServer});
      }
    } else {
      //si se cancela la compra
      return;
    }
  }

  private calculateTotal(){
    let Total = 0;
    this.cartDataServer.data.forEach(p=>{
      const {numInCart} = p;
      const {price} = p.product;

      Total += numInCart*price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total)
  }

  checkoutFromCart(userId:number){
    this.http.post(`${this.SERVER_URL}/orders/payment`, null).subscribe((res:{success:boolean})=>{
      if(res.success){
        this.resetServerData();
        this.http.post(`${this.SERVER_URL}/orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }). subscribe((data: OrderResponse)=>{

          this.orderSvc.getSingleOrder(data.order_id).then(prods=>{
            if(data.success){
              const navigationExtras: NavigationExtras = {
                state:{
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              //TODO HIDE SPINNER
              this.router.navigate(['/gracias'], navigationExtras).then(p=>{
                this.cartDataClient = {total: 0, prodData:[{ incart: 0, id: 0}]};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              }).catch(error=>console.log(error));
            }
          })
        })
      }
    })
  }

  private resetServerData(){
    this.cartDataServer = {total: 0, data:[{numInCart: 0, product: undefined}]};
    this.cartDataObs$.next({... this.cartDataServer})
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