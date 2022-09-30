import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private presets: PresetResponse[] = [];
  private XAMPP = environment.XAMPP;
  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) {  
    
  }

  getSingleOrder(id:number):Observable<PresetResponse[]>{
      return this.http.get<PresetResponse[]>(this.SERVER_URL + '/orders/' + id)
  }
  
  // getSingleOrder(id:number){
  //   return this.http.get<PresetResponse[]>(this.SERVER_URL + '/orders/' + id).toPromise()
  // }
}

interface PresetResponse{
  id: number,
  title: string,
  description: string,
  price: number,
  quantityOrder: number,
  image: string
}