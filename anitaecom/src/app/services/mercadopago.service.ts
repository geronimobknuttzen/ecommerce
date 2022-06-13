import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MPorder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private http: HttpClient) { }

  paymentCheckout(){

  }
}
