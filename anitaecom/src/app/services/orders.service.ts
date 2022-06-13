import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private presets: PresetResponse[] = [];
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {  
    
  }
  getSingleOrder(orderId:number){
    return this.http.get<PresetResponse[]>(this.SERVER_URL + '/orders/' + orderId).toPromise()
  }
}

interface PresetResponse{
  id: number,
  title: string,
  description: string,
  price: number,
  quantityOrder: number,
  image: string
}